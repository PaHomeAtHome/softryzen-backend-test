const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Set title for movie"],
  },
  director: {
    type: String,
    required: [true, "Set director for movie"],
  },
  releaseDate: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

movieSchema.post("save", function (error, doc, next) {
  next(new ValidationError(error));
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
