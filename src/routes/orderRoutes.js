// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define routes

router.post('/orders', orderController.createOrder);
router.get('/orders/:userId/history', orderController.getOrderHistory);
router.post('/orders', orderController.calculateOrderAmount);
router.get('/orders/:userId/history', orderController.getCartItems);


module.exports = router;
