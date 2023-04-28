const { changeMovieById } = require("../../services/moviesService");

const changeMoviesController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: userId } = req.user;

  const { MovieId } = req.params;
  await changeMovieById({ MovieId, name, email, phone, favorite }, userId);
  res.status(200).json({ name, email, phone, favorite });
};

module.exports = changeMoviesController;
