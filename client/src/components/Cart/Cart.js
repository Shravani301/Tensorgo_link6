import React, { useState, useEffect } from 'react';
import './Cart.css'; // Import the CSS file for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from the server (replace 'apiEndpoint' with your actual API endpoint)
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('api/cartItem'); // Replace 'apiEndpoint' with the actual endpoint
        const data = await response.json();
        setCartItems(data.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Function to handle order
  const handleOrder = () => {
    // Implement logic to place an order (e.g., send a request to your server)
    console.log('Order placed!');
  };

  // Function to handle cancel
  const handleCancel = () => {
    // Implement logic to cancel the order (e.g., remove items from the cart)
    setCartItems([]);
    console.log('Order cancelled!');
  };

  // Function to proceed to checkout
  const handleCheckout = () => {
    // Implement logic to navigate to the checkout page
    console.log('Proceeding to checkout!');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.itemId}>
              {item.quantity} x {item.itemName} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <div className="button-container">
        <button className="order-button" onClick={handleOrder}>Order</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
