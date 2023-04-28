const { getMovies } = require("../../services/moviesService");

const getMoviesController = async (req, res) => {
  const { _id: userId } = req.user;

  const movies = await getMovies(userId);
  res.json({ movies: movies });
};

module.exports = getMoviesController;
