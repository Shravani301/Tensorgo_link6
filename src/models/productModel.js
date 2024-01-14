// productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Other product details...
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
