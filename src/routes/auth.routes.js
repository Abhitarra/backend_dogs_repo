const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/reset-password", ctrl.resetPassword);
// router.post("/send-otp", ctrl.sendOtp);
// router.post("/verify-otp", ctrl.verifyOtp);
module.exports = router;