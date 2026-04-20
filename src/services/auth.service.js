const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const logger = require("../utils/logger");

exports.signup = async ({ email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");
   
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
  });
  logger.info(`Creating user with email: ${email}`);
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const hashed = await bcrypt.hash(password, 10);
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
  logger.info(`User logged in with email: ${email}`);
  return { token, role: user.role };
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, message: "User not found" };
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  user.resetToken = hashedToken;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save();

  const resetLink = `${process.env.RESET_PASSWORD_URL}${token}`;

  // send email
  await sendEmail(user.email, resetLink);
  logger.info(`Password reset link sent to ${email}`);
  return { success: true };
};
``
exports.resetPassword = async ({ token, password }) => { 
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = await bcrypt.hash(password, 10);

  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
  logger.info(`Password reset successful for user with email: ${user.email}`);
  return { success: true };
};

async function sendEmail (email, resetLink) {

  // ✅ transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // simpler than host/port
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // ✅ send mail
  await transporter.sendMail({
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  });
  logger.info(`Email sent to ${email}`);
  return { success: true};
};

// exports.verifyOtp = async ({ email, otp }) => {
//   const user = await User.findOne({ email });
//   if (!user) return { success: false, message: "User not found" };

//   // ✅ hash incoming OTP
//   const hashedOtp = crypto
//     .createHash("sha256")
//     .update(otp)
//     .digest("hex");

//   // ✅ compare hashed values
//   if (user.otp !== hashedOtp) {
//     return { success: false, message: "Invalid OTP" };
//   }

//   // ✅ clear OTP after success
//   user.otp = null;
//   user.otpExpiry = null;

//   await user.save(); // ✅ correct

//   return { success: true, message: "OTP verified" };
// };

