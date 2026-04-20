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
  const result = await authService.resetPassword(req.body);
  res.json(result);
};

// exports.sendOtp = async (req, res) => {
//   const result = await authService.sendOtp(req.body.email);
//   res.json(result);
// };

// exports.verifyOtp = async (req, res) => {
//   const result = await authService.verifyOtp(req.body);
//   res.json(result);
// };