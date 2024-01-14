// cartItemController.js

// Import necessary dependencies or models
const CartItem = require('../models/cartItem');
const Product = require('../models/productModel');


// Controller method to get cart items for a user
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Retrieve cart items for the specified user
    const cartItems = await CartItem.find({ userId });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error getting cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const { itemId, quantity } = req.body;
  
      // Validate input
      if (!itemId || !quantity) {
        return res.status(400).json({ error: 'Item ID and quantity are required.' });
      }
  
      // Check if the product exists
      const product = await Product.findById(itemId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      // Create a new cart item
      const newCartItem = new CartItem({
        userId,
        itemId,
        quantity,
      });
  
      // Save the new cart item to the database
      const savedCartItem = await newCartItem.save();
  
      res.status(201).json(savedCartItem);
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
  
      // Check if it's a validation error
      if (error.name === 'ValidationError') {
        const validationErrors = Object.keys(error.errors).map((key) => {
          return { field: key, message: error.errors[key].message };
        });
        return res.status(400).json({ error: 'Validation Error', validationErrors });
      }
  
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

// Other controller methods related to cart items...

module.exports = {
  getCartItems,
  addToCart
  // Export other cart item controller methods as needed...
};
