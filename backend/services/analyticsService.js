const fs = require('fs');
const path = require('path');
const { applicantsPath, feedbackPath } = require('../config');

class AnalyticsService {
  constructor() {
    this.applicantsPath = applicantsPath;
    this.feedbackPath = feedbackPath;
  }
  // Load applicants data
  loadApplicants() {
    try {
      const data = fs.readFileSync(this.applicantsPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading applicants data:', error);
      throw new Error('Failed to load applicants data');
    }
  }

  // Load feedback data
  loadFeedback() {
    try {
      const data = fs.readFileSync(this.feedbackPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading feedback data:', error);
      throw new Error('Failed to load feedback data');
    }
  }

  // Get top 5 applicants based on mentor feedback scores
  getTopApplicants() {
    const applicants = this.loadApplicants();
    const feedback = this.loadFeedback();

    // Calculate average score for each applicant
    const applicantScores = applicants.map(applicant => {
      const applicantFeedback = feedback.filter(f => f.applicantId === applicant.id);
      
      if (applicantFeedback.length === 0) {
        return {
          id: applicant.id,
          name: applicant.name,
          score: 0
        };
      }

      const totalScore = applicantFeedback.reduce((sum, f) => sum + f.rating, 0);
      const averageScore = (totalScore / applicantFeedback.length).toFixed(1);

      return {
        id: applicant.id,
        name: applicant.name,
        score: parseFloat(averageScore)
      };
    });

    // Sort by score in descending order and return top 5
    return applicantScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  // Get daily statistics for a specific date
  getDailyStats(dateString) {
    const applicants = this.loadApplicants();
    
    // Filter applicants by date
    const dateApplicants = applicants.filter(applicant => {
      const applicantDate = new Date(applicant.applicationDate).toISOString().split('T')[0];
      return applicantDate === dateString;
    });

    // Count by status
    const stats = {
      date: dateString.replace(/-/g, ''),
      total: dateApplicants.length,
      accepted: dateApplicants.filter(a => a.status === 'accepted').length,
      rejected: dateApplicants.filter(a => a.status === 'rejected').length,
      pending: dateApplicants.filter(a => a.status === 'pending').length
    };

    return stats;
  }

  // Get feedback summary categorized by rating
  getFeedbackSummary() {
    const feedback = this.loadFeedback();

    const summary = {
      positive: feedback.filter(f => f.rating >= 4).length,
      neutral: feedback.filter(f => f.rating === 3).length,
      negative: feedback.filter(f => f.rating <= 2).length
    };

    return summary;
  }

  // Utility method to validate date format
  isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }
}

module.exports = new AnalyticsService();