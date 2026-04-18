const mongoose = require("mongoose");
const AppError = require("../utils/AppError");
const ERRORS = require("../constants/errorCodes");
const MSG = require("../constants/messages");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError(MSG.INVALID_ID, 400, ERRORS.INVALID_ID));
  }
  next();
};
