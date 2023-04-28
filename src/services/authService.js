const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  WrongParametersError,
  NotFoundError,
} = require("../helpers/errors");

const registration = async (email, password, username) => {
  const verificationToken = uuidv4();

  const user = new User({
    email,
    password,
    username,
    verificationToken,
  });

  const result = await user.save();

  const { subscription } = result;
  return { email, subscription };
};

const verify = async (email) => {
  if (!email) {
    throw new WrongParametersError("missing required field email");
  }

  const verification = await User.findOne({ email });

  if (!verification.verificationToken) {
    throw new WrongParametersError("Verification has already been passed");
  }
};

const registrationVerification = async (verificationToken) => {
  const verification = await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );

  if (!verification) {
    throw new NotFoundError("User not found");
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  const { subscription } = user;

  if (!password) {
    throw new WrongParametersError(`Password is required`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );

  return { token, user: { email, subscription } };
};

const logout = async (user) => {
  user.token = null;
};

const currentUser = async (userId) => {
  const user = await User.findById(userId);
  const { email, subscription } = user;
  return { email, subscription };
};

module.exports = {
  registration,
  registrationVerification,
  login,
  logout,
  currentUser,
  verify,
};
