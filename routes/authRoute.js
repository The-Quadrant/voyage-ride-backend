const express = require("express");
const {
	register,
	signIn,
	forgotPassword,
	resetPassword,
	getMe,
	updateProfile,
	updatePassword,
} = require("../controller/authController");
const { body } = require("express-validator");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.get("/me", protect, getMe);
router.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 6 }),
	register
);
router.post(
	"/signin",
	body("email").isEmail(),
	body("password").isLength({ min: 6 }),
	signIn
);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.put("/updateProfile", protect, updateProfile);
router.put("/updatePassword", protect, updatePassword);

module.exports = router;
