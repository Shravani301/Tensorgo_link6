// controllers/orderController.js
const Order = require('../models/order');
const CartItem = require('../models/cartItem');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createSubscriptionOrder = async (req, res) => {
    const { userId, planId } = req.body;
  
    try {
      // Create an order for the subscription
      const newOrder = new Order({
        userId,
        planId,
        orderDate: new Date(),
        // ... other order details
      });
  
      await newOrder.save();
  
      res.status(201).json({ message: 'Subscription order created successfully' });
    } catch (error) {
      console.error('Error creating subscription order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Helper function to calculate order amount
const calculateOrderAmount = async (userId) => {
  try {
    // Fetch cart items for the user
    const cartItems = await getCartItems(userId);

    // Fetch user's subscription plan
    const user = await User.findById(userId);
    const subscriptionPlan = user.subscriptionPlan || 'basic'; // Default to basic if no plan is specified

    // Calculate order amount based on subscription plan
    let totalAmount = 0;

    switch (subscriptionPlan) {
      case 'basic':
        totalAmount = calculateBasicOrderAmount(cartItems);
        break;
      case 'standard':
        totalAmount = calculateStandardOrderAmount(cartItems);
        break;
      case 'plus':
        totalAmount = calculatePlusOrderAmount(cartItems);
        break;
      default:
        throw new Error('Invalid subscription plan');
    }

    return totalAmount;
  } catch (error) {
    throw new Error('Error calculating order amount');
  }
};

// Calculate order amount for the basic subscription plan
const calculateBasicOrderAmount = (cartItems) => {
  // Add logic to calculate charges based on the basic plan
  // This can include a fixed charge per item or other factors
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to cents
};

// Calculate order amount for the standard subscription plan
const calculateStandardOrderAmount = (cartItems) => {
  // Add logic to calculate charges based on the standard plan
  // This can include a different pricing structure or other factors
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to cents
};

// Calculate order amount for the plus subscription plan
const calculatePlusOrderAmount = (cartItems) => {
  // Add logic to calculate charges based on the plus plan
  // This can include a different pricing structure or other factors
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to cents
};

// Fetch cart items for a user (replace with your actual logic)
const getCartItems = async (userId) => {
  try {
    // Example: Fetch user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Example: Fetch cart items for the user
    const cartItems = await CartItem.find({ userId });

    return cartItems;
  } catch (error) {
    throw new Error('Error fetching cart items');
  }
};

// Create a new order with Stripe payment
const createOrder = async (req, res) => {
  const { userId, planId, orderDate } = req.body;

  try {
    // Get cart items for the user
    const cartItems = await getCartItems(userId);

    // Calculate order amount
    const orderAmount = await calculateOrderAmount(userId);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'usd', // Replace with your desired currency code
    });

    // Save order with paymentIntent ID
    const newOrder = new Order({
      userId,
      planId,
      orderDate,
      paymentStatus: 'Pending', // You might update this later based on payment success
      paymentDetails: {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      },
    });

    await newOrder.save();

    // Confirm the payment intent
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      { payment_method: 'pm_card_visa' } // Replace with the actual payment method
    );

    // Update order payment status
    newOrder.paymentStatus = 'Paid';
    newOrder.paymentDetails.paymentIntentId = confirmedPaymentIntent.id;

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order history for a user
const getOrderHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId }).populate('planId');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getOrderHistory,
  calculateOrderAmount,
  getCartItems,createSubscriptionOrder,
};
