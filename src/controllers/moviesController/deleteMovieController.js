const { deleteMovieById } = require("../../services/moviesService");

const deleteMovieController = async (req, res) => {
  const { _id: userId } = req.user;
  const { movieId } = req.params;
  await deleteMovieById(movieId, userId);
  res.status(200).json({ message: "Movie deleted" });
};

module.exports = deleteMovieController;
