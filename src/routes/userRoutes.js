/*routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;*/

// userRoutes.js

// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user by admin
router.post('/register', userController.registerUserByAdmin);

// Login user
router.post('/login', userController.loginUser);
router.put('/update', userController.updateUserDetails);

// Logout user
router.post('/logout', userController.logout);

module.exports = router;
