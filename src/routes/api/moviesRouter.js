const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addMovieValidation,
} = require("../../middlewares/validationMiddleware");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  addMovieController,
  changeMovieController,
  deleteMovieController,
  getMovieByIdController,
  getMoviesController,
} = require("../../controllers/moviesController/");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getMoviesController));
router.get("/:movieId", asyncWrapper(getMovieByIdController));
router.post("/", addMovieValidation, asyncWrapper(addMovieController));
router.put(
  "/:movieId",
  addMovieValidation,
  asyncWrapper(changeMovieController)
);
router.delete("/:movieId", asyncWrapper(deleteMovieController));

module.exports = { moviesRouter: router };
