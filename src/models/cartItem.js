// models/cartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Assuming you have a Product model
  quantity: { type: Number, default: 1 }, // Default quantity is 1
  createdAt: { type: Date, default: Date.now },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
