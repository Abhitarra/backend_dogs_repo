const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  const user = await authService.signup(req.body);
  res.json({ message: "User created", user });
};

exports.login = async (req, res) => {
  const data = await authService.login(req.body);
  res.json(data);
};

exports.forgotPassword = async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  res.json(result);
};

exports.resetPassword = async (req, res) => {
  console.log("Received reset password request with body:", req.body);
  const result = await authService.resetPassword(req.body);
  console.log("Reset password result:", result);
  res.json(result);
};