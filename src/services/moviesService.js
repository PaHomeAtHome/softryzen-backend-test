const { Movie } = require("../db/movieModel");
const { WrongParametersError } = require("../helpers/errors");

const getMovies = async (owner) => {
  const movies = await Movie.find({ owner });
  return movies;
};

const getMovieById = async (movieId, userId) => {
  const movie = await Movie.findOne({ _id: movieId, owner: userId });

  if (!movie) {
    throw new WrongParametersError(`no posts with id ${movieId} found`);
  }
  return movie;
};

const addMovie = async ({ name, email, phone, favorite }, owner) => {
  const movie = new Movie({ name, email, phone, favorite, owner });
  await movie.save();
};

const changeMovieById = async (
  { movieId, name, email, phone, favorite },
  userId
) => {
  await Movie.findOneAndUpdate(
    { _id: movieId, owner: userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
};

const deleteMovieById = async (movieId, userId) => {
  await Movie.findOneAndRemove({ _id: movieId, owner: userId });
};

const updateStatusMovie = async (
  movieId,
  userId,
  { name, email, phone, favorite }
) => {
  await Movie.findOneAndUpdate(
    { _id: movieId, owner: userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  changeMovieById,
  deleteMovieById,
  updateStatusMovie,
};
