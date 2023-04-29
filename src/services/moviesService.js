const { Movie } = require("../db/movieModel");
const { WrongParametersError } = require("../helpers/errors");

const getMovies = async (owner, limit, skip) => {
  const movies = await Movie.find({ owner }).skip(skip).limit(limit);
  return movies;
};

const getMovieById = async (movieId, userId) => {
  try {
    const movie = await Movie.findOne({ _id: movieId, owner: userId });
    if (!movie) {
      throw new WrongParametersError(`no movies with id ${movieId} found`);
    }
    return movie;
  } catch (error) {
    throw new WrongParametersError(error.message);
  }
};

const addMovie = async ({ title, director, releaseDate }, owner) => {
  const movie = new Movie({ title, director, releaseDate, owner });
  await movie.save();
};

const changeMovieById = async (
  { movieId, title, director, releaseDate },
  userId
) => {
  await Movie.findOneAndUpdate(
    { _id: movieId, owner: userId },
    {
      $set: { title, director, releaseDate },
    }
  );
};

const deleteMovieById = async (movieId, userId) => {
  const result = await Movie.findOneAndRemove({ _id: movieId, owner: userId });
  return result;
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  changeMovieById,
  deleteMovieById,
};
