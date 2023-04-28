const { getMovieById } = require("../../services/moviesService");

const getMovieByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { movieId } = req.params;
  const movie = await getMovieById(movieId, userId);
  movie ? res.json(movie) : res.status(404).json({ message: "Not found" });
};

module.exports = getMovieByIdController;
