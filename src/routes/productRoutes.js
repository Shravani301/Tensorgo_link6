// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to add a new product (admin only)
router.post('/products', productController.addProduct);

// Route to delete a product (admin only)
router.delete('/products/:productId', productController.deleteProduct);

// Other routes related to products...

module.exports = router;
