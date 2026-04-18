const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async ({ email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { token, role: user.role };
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };
  return {
    success: true,
    message: "User exists, proceed to reset password",
    username: user.username,
    password: user.password,
  };
};

exports.resetPassword = async (password) => { 
  const hashed = await bcrypt.hash(password, 10);
  // For demo, we update the first user. In real app, identify user via token or email.
  const user = await User.findOneAndUpdate({}, { password: hashed }, { new: true });
  if (!user) return { success: false, message: "User not found" };
  return { success: true, message: "Password reset successful" };
};
