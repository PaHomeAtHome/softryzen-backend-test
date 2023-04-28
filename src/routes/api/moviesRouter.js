const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addMovieValidation,
} = require("../../middlewares/validationMiddleware");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  addMoviesController,
  changeMoviesController,
  deleteMoviesController,
  getMoviesByIdController,
  getMoviesController,
} = require("../../controllers/moviesController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getMoviesController));
router.get("/:movieId", asyncWrapper(getMoviesByIdController));
router.post("/", addMovieValidation, asyncWrapper(addMoviesController));
router.put(
  "/:movieId",
  addMovieValidation,
  asyncWrapper(changeMoviesController)
);
router.delete("/:movieId", asyncWrapper(deleteMoviesController));

module.exports = { moviesRouter: router };
