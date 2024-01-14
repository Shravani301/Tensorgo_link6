import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutForm = ({ userId, cartItems }) => {
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    // Add more shipping details as needed
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    // Add more payment details as needed
  });

  const [deliveryFee, setDeliveryFee] = useState(0);

  // Example function to calculate delivery fee based on subscription plan
  const calculateDeliveryFee = async () => {
    try {
      // You can implement your backend logic here to calculate delivery fee
      const response = await axios.post('/api/calculateDeliveryFee', {
        userId,
        subscriptionPlan: 'plus', // Replace with actual subscription plan retrieval logic
        cartItems,
      });

      setDeliveryFee(response.data.deliveryFee);
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
    }
  };

  useEffect(() => {
    // Fetch and set delivery fee when the component mounts
    calculateDeliveryFee();
  }, [userId, cartItems]);

  // Example function to handle order completion
  const handleCompleteOrder = async () => {
    try {
      // Implement order completion functionality with axios.post
      // Redirect or update state after successful order completion
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      
      {/* Form fields for shipping details */}
      <label>
        Address:
        <input
          type="text"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
        />
      </label>
      <br />

      {/* Form fields for payment details */}
      <label>
        Card Number:
        <input
          type="text"
          value={paymentInfo.cardNumber}
          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
        />
      </label>
      <br />
      <label>
        Expiration Date:
        <input
          type="text"
          value={paymentInfo.expirationDate}
          onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })}
        />
      </label>
      <br />

      {/* Display delivery fee */}
      <p>Delivery Fee: {deliveryFee}</p>

      {/* Button to complete the order */}
      <button onClick={handleCompleteOrder}>Complete Order</button>
    </div>
  );
};

export default CheckoutForm;
