const logger = require('../utils/logger');
const MSG = require('../constants/messages');
const ERRORS = require('../constants/errorCodes');
const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {

  logger.error(`Error: ${err.message}`);
  // logger.error(`Stack trace: ${err.stack}`);
  // Mongo duplicate error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: MSG.BREED_EXISTS,
      errorCode: ERRORS.DUPLICATE_ERROR
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: MSG.INVALID_ID,
      errorCode: ERRORS.INVALID_ID
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || MSG.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
    errorCode: err.errorCode || ERRORS.INTERNAL_ERROR
  });
};