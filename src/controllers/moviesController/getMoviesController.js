const { getMovies } = require("../../services/moviesService");

const getMoviesController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const movies = await getMovies(userId, limit, skip);
  res.json({ movies: movies });
};

module.exports = getMoviesController;
