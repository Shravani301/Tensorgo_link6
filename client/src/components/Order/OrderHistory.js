import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        // Update the endpoint based on your backend structure
        const response = await axios.get(`http://localhost:3000/api/orders/${userId}/history`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id} - Plan: {order.plan.name} - Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
