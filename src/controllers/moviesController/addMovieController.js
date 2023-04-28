const { addMovie } = require("../../services/moviesService");

const addMovieController = async (req, res) => {
  const { _id: userId } = req.user;
  const { title, director, releaseDate } = req.body;

  await addMovie({ title, director, releaseDate }, userId);
  res.status(201).json({ message: title, director, releaseDate });
};

module.exports = addMovieController;
