const AppError = require("../utils/AppError");
const ERRORS = require("../constants/errorCodes");
const MSG = require("../constants/messages");

module.exports =
  (schema, source = "body") =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message.replace(/"/g, ""));

      return next(
        new AppError(
          MSG.VALIDATION_FAILED,
          400,
          ERRORS.VALIDATION_ERROR,
          errors,
        ),
      );
    }

    req.body = value;
    next();
  };
