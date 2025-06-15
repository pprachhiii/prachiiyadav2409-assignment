const analyticsService = require('../services/analyticsService');

class AnalyticsController {
  // GET /api/applicants/top
  async getTopApplicants(req, res) {
    try {
      const topApplicants = analyticsService.getTopApplicants();
      
      res.status(200).json({
        success: true,
        data: topApplicants,
        message: 'Top 5 applicants retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting top applicants:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  // GET /api/applicants/stats?date=YYYY-MM-DD
  async getApplicantStats(req, res) {
    try {
      const { date } = req.query;

      // Validate date parameter
      if (!date) {
        return res.status(400).json({
          success: false,
          error: 'Bad request',
          message: 'Date parameter is required (format: YYYY-MM-DD)'
        });
      }

      if (!analyticsService.isValidDate(date)) {
        return res.status(400).json({
          success: false,
          error: 'Bad request',
          message: 'Invalid date format. Please use YYYY-MM-DD format'
        });
      }

      const stats = analyticsService.getDailyStats(date);

      res.status(200).json({
        success: true,
        data: stats,
        message: `Daily statistics for ${date} retrieved successfully`
      });
    } catch (error) {
      console.error('Error getting applicant stats:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  // GET /api/feedback/summary
  async getFeedbackSummary(req, res) {
    try {
      const summary = analyticsService.getFeedbackSummary();

      res.status(200).json({
        success: true,
        data: summary,
        message: 'Feedback summary retrieved successfully'
      });
    } catch (error) {
      console.error('Error getting feedback summary:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }
}

module.exports = new AnalyticsController();