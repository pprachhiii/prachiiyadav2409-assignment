const path = require('path');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

module.exports = {
  applicantsPath: path.resolve(requireEnv('APPLICANTS_DATA_PATH')),
  feedbackPath: path.resolve(requireEnv('FEEDBACK_DATA_PATH')),
};
