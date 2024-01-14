// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Import your custom CSS for styling

const Home = () => {
  return (
    <div>
      <h2>Welcome to My React App</h2>
      <p>This is the home page content. Modify as needed.</p>

      {/* Menu Bar */}
      <div className="menu-bar">
        <Link to="/plans" className="menu-button">View Plans</Link>
        <Link to="/cart" className="menu-button">View Cart</Link>
        <Link to="/checkout" className="menu-button">Proceed to Checkout</Link>
        <span className="checkout-total">Checkout Total Amount: $100.00</span>
        <Link to="/login" className="menu-button">Login</Link>
        <Link to="/register" className="menu-button">Register</Link>
        <Link to="/logout" className="menu-button">Logout</Link>
      </div>
    </div>
  );
};

export default Home;
