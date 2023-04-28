const Joi = require("joi").extend(require("@joi/date"));
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addMovieValidation: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(1).max(100).required(),
      director: Joi.string().min(1).max(100).required(),
      releaseDate: Joi.date().format("DD-MM-YYYY").max("now").required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(
        new ValidationError(
          validationResult.error.details[0].message.replace(/"/g, "")
        )
      );
    }

    next();
  },
};
