const { changeMovieById } = require("../../services/moviesService");

const changeMovieController = async (req, res) => {
  const { title, director, releaseDate } = req.body;
  const { _id: userId } = req.user;

  const { movieId } = req.params;
  await changeMovieById({ movieId, title, director, releaseDate }, userId);
  res.status(200).json({ title, director, releaseDate });
};

module.exports = changeMovieController;
