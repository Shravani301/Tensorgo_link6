// userController.js

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Function to register a new user by admin
const registerUserByAdmin = async (req, res) => {
  try {
    const { username, password, role, email, mobile } = req.body;

    // Check if the user with the given email or mobile number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or mobile number already exists.' });
    }

    // Register the user
    const newUser = new User({
      username,
      email,
      password,
      registrationDate: new Date(),
      subscriptionPlan: 'basic',
      subscriptionEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user by admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to login user and generate tokens
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Check if the refresh token is valid
    if (!user.refreshToken) {
      // Generate refresh token if not available
      user.refreshToken = uuidv4();
      await user.save();
    }

    // Hash the refresh token before sending it to the client
    const hashedRefreshToken = await bcrypt.hash(user.refreshToken, 10);

    // Generate access token
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, 'your-access-secret', {
      expiresIn: '15m', // Access token expiration time
    });

    // Send both tokens to the client
    res.status(200).json({ message: 'Login successful', user, accessToken, refreshToken: hashedRefreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    // Assuming you have authentication middleware that attaches userId to the request
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update user details
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;

    await user.save();

    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const subscribeToPlan = async (req, res) => {
  const { userId, planId } = req.body;

  try {
    // Fetch user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch SaasPlan
    const saasPlan = await SaasPlan.findById(planId);

    if (!saasPlan) {
      return res.status(404).json({ error: 'SaasPlan not found' });
    }

    // Update user with subscribed plan
    user.subscriptionPlan = planId;
    await user.save();

    res.status(200).json({ message: 'User subscribed to plan successfully' });
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Function to logout user and revoke tokens
const logout = async (req, res) => {
  try {
    // Assuming you have authentication middleware that attaches userId to the request
    const userId = req.id;

    console.log('Received userId:', userId);

    // Verify if the user exists
    const user = await User.findById(userId);

    console.log('Retrieved user:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the user has a refreshToken
    if (!user.refreshToken) {
      return res.status(401).json({ error: 'User does not have a refreshToken.' });
    }

    // Revoke the refresh token
    user.refreshToken = null;

    // Save the user to update the refresh token
    await user.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerUserByAdmin,
  loginUser,updateUserDetails,
  logout,subscribeToPlan,
};
