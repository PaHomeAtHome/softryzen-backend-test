const { addMovie } = require("../../services/moviesService");

const addMoviesController = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, email, phone, favorite } = req.body;

  await addMovie({ name, email, phone, favorite }, userId);
  res.status(201).json({ message: name, email, phone, favorite });
};

module.exports = addMoviesController;
