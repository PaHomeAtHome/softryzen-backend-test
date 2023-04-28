const { registration } = require("../../services/authService");

const registrationController = async (req, res) => {
  const { email, password, username } = req.body;

  const user = await registration(email, password, username);

  res.status(201).json({ user });
};

module.exports = registrationController;
