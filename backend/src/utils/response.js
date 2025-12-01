// Common API response helpers
// Location: backend/src/utils/response.js

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {String} message - Success message
 * @param {Number} statusCode - HTTP status code (default: 200)
 */
const success = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {String|Error} error - Error message or Error object
 * @param {Number} statusCode - HTTP status code (default: 500)
 */
const error = (res, error, statusCode = 500) => {
  const message = error instanceof Error ? error.message : error;
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  success,
  error,
};


