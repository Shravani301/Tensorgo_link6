// cartItemRoutes.js

const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

// Route to get cart items for a user
router.get('/orders/:userId/cart-items', cartItemController.getCartItems);
router.post('/orders/:userId/add-to-cart', cartItemController.addToCart);


// Other routes related to cart items...

module.exports = router;
