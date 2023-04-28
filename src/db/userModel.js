const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ConflictError, ValidationError } = require("../helpers/errors");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new ConflictError("Email in use"));
  } else {
    next(new ValidationError(error));
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
