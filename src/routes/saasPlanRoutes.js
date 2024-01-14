// routes/saasPlanRoutes.js
const express = require('express');
const router = express.Router();
const saasPlanController = require('../controllers/saasPlanController');

// Define routes
router.get('/saas-plans', saasPlanController.getAllPlans);
router.get('/saas-plans/:id', saasPlanController.getPlanById);
router.post('/saas-plans', saasPlanController.createPlan);
router.put('/saas-plans/:id', saasPlanController.updatePlan);
router.delete('/saas-plans/:id', saasPlanController.deletePlan);

module.exports = router;
