// models/saasPlan.js
const mongoose = require('mongoose');

const saasPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  description:{type:String},
  price: { 
    
      amount:{type:Number,required:true,},
      currency:{type:String,required:true,},
    },
    features:{type:[String]},
    duration:{type:Number}

  // Add other fields as needed
});

const SaasPlan = mongoose.model('SaasPlan', saasPlanSchema);

module.exports = SaasPlan;
