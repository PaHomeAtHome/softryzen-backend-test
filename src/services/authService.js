const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  WrongParametersError,
} = require("../helpers/errors");

const registration = async (email, password, username) => {
  const user = new User({
    email,
    password,
    username,
  });

  await user.save();

  return { email, username };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  const { username } = user;

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

  await User.findByIdAndUpdate(user._id, { token });

  return { token, user: { email, username } };
};

const logout = async (user) => {
  user.token = null;
  await User.findByIdAndUpdate(user._id, { token: null });
};

const currentUser = async (userId) => {
  const user = await User.findById(userId);
  const { email, username } = user;
  return { email, username };
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
};
