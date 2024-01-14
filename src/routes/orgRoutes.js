// routes/organizationRoutes.js
const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/orgController');

// Define routes
router.post('/organizations', organizationController.createOrganization);
router.get('/organizations', organizationController.getAllOrganizations);

module.exports = router;
