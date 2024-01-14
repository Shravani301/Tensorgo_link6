// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'SaasPlan', required: true },
  orderDate:{type:Date},
  paymentStatus:{String},
  //paymentDetails:{type:String},
  paymentDetails:{
    transactionId:{type:String},
    amount:{type:Number},
    currency:{type:String},
  }
  // Add other fields as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
