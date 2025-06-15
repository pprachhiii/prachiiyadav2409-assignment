const express = require('express');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

// GET /api/applicants/top - Returns top 5 applicants based on mentor feedback scores
router.get('/applicants/top', analyticsController.getTopApplicants);

// GET /api/applicants/stats?date=YYYY-MM-DD - Returns daily summary of applicants
router.get('/applicants/stats', analyticsController.getApplicantStats);

// GET /api/feedback/summary - Returns feedback ratings summary
router.get('/feedback/summary', analyticsController.getFeedbackSummary);

module.exports = router;