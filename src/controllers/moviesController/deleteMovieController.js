const { deleteMovieById } = require("../../services/moviesService");

const deleteMovieController = async (req, res) => {
  const { _id: userId } = req.user;
  const { movieId } = req.params;
  const result = await deleteMovieById(movieId, userId);
  result
    ? res.status(200).json({ message: result })
    : res.status(404).json({ message: "Not found" });
};

module.exports = deleteMovieController;
