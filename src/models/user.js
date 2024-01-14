/* models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  subscription:{
    planId:{type:mongoose.Schema.Types.ObjectId,ref:'SaasPlan'},
    startDate:{type:Date},
    endDate:{type:Date},
    paymentStatus:{type:String},
  }
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
*/

// user.js

// userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, unique: true, required: true },
  refreshToken: { type: String },
  revokedTokens: [{ type: String }],
});

userSchema.pre('save', async function (next) {
  try {
    // Hash the password before saving to the database
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    // Hash the refresh token before saving to the database
    if (this.isModified('refreshToken')) {
      this.refreshToken = await bcrypt.hash(this.refreshToken, 10);
    }

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;