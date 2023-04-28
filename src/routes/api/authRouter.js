const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

const {
  loginController,
  registrationController,
  logoutController,
  currentUserController,
  registrationVerificationController,
  verifyController,
} = require("../../controllers/authController");

router.post("/registration", asyncWrapper(registrationController));
router.post("/verify", asyncWrapper(verifyController));
router.get(
  "/verify/:verificationToken",
  asyncWrapper(registrationVerificationController)
);
router.post("/login", asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));

module.exports = { authRouter: router };
