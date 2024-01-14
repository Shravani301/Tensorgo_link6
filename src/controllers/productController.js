// productController.js

const Product = require('../models/productModel.js');

// Controller method to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to add a new product (admin only)
const addProduct = async (req, res) => {
  try {
    // Validate if the user is an admin (you may implement user roles and authentication)
    const isAdmin = req.headers['x-is-admin']; // Example header indicating admin status
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized. Admin access required.' });
    }

    const { name, price } = req.body;

    // Validate input
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }

    const newProduct = new Product({
      name,
      price,
      // Other product details...
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to delete a product (admin only)
const deleteProduct = async (req, res) => {
  try {
    // Validate if the user is an admin (you may implement user roles and authentication)
    const isAdmin = req.headers['x-is-admin']; // Example header indicating admin status
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized. Admin access required.' });
    }

    const { productId } = req.params;

    // Validate input
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other controller methods related to products...

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  // Export other product controller methods as needed...
};
