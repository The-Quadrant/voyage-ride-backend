const User = require("../model/User");
const { validationResult } = require("express-validator");
const HttpError = require("../util/HttpError");
const getToken = require("../util/getToke");
const sendMail = require("../util/sendMail");
const { generateToken, generateHashedToken } = require("../util/generateToken");
const { getHash, compareHash } = require("../util/getHash");

exports.register = async (req, res, next) => {
	const errors = validationResult(req);
	const { name, email, password, tel } = req.body;
	let hashedPassword;
	if (!errors.isEmpty()) {
		return next(new HttpError(400, "Please enter a valid email address"));
	}
	// hash password
	hashedPassword = getHash(password);

	try {
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			tel,
		});
		const token = getToken({ user });
		res.status(201).json({ success: true, token });
	} catch (error) {
		next(error);
	}
};

exports.signIn = async (req, res, next) => {
	const errors = validationResult(req);
	const { email, password } = req.body;
	if (!errors.isEmpty()) {
		return next(new HttpError(400, "Please enter a valid email address"));
	}

	try {
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return next(new HttpError(404, "Invalid Request"));
		}
		const isMatch = await compareHash(password, user.password);
		if (!isMatch) {
			return next(new HttpError(404, "Invalid Request"));
		}

		const token = getToken({ user });
		res.status(200).json({ success: true, token });
	} catch (error) {
		next(error);
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(new HttpError(404, "Not Found"));
		}
		const { token, hashedToken } = generateToken();
		const resetLink = `${req.protocol}://${req.get(
			"host"
		)}/api/auth/resetpassword/${token}`;
		user.resetPasswordToken = hashedToken;
		user.resetPasswordTokenExpiration = Date.now() + 10 * 60 * 1000;
		await user.save({ validateBeforeSave: false });
		await sendMail({
			email,
			subject: "Password reset link",
			message: "send a put request to this link " + resetLink,
		});

		res.status(200).json({ success: true, message: "Successful" });
	} catch (error) {
		const user = await User.findOne({ email });
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiration = undefined;
		await user.save({ validateBeforeSave: false });
		next(error);
	}
};

exports.resetPassword = async (req, res, next) => {
	const { resetToken } = req.params;
	const { password } = req.body;
	const hashedToken = generateHashedToken(resetToken);
	console.log(hashedToken);
	try {
		const user = await User.findOne({
			resetPasswordToken: hashedToken,
			resetPasswordTokenExpiration: { $gt: Date.now() },
		});
		if (!user) {
			return next(new HttpError(404, "Not Found"));
		}
		const hashedPassword = getHash(password);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiration = undefined;
		await user.save({ validateBeforeSave: false });
		const jwtToken = getToken({ user });
		res.status(201).json({ success: true, token: jwtToken });
	} catch (error) {
		next(error);
	}
};

exports.getMe = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return next(new HttpError(401, "Unauthorized"));
		}
		res.status(200).json({ data: user });
	} catch (error) {
		next(error);
	}
};

exports.updateProfile = async (req, res, next) => {
	const { name, email, tel } = req.body;
	let user;
	try {
		user = await User.findById(req.user._id);
		if (!user) {
			return next(new HttpError(404, "Not Found"));
		}
		user = await User.findByIdAndUpdate(
			req.user._id,
			{ name, email, tel },
			{ new: true, runValidators: true }
		);

		res.status(200).json({ data: user });
	} catch (error) {
		next(error);
	}
};

exports.updatePassword = async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;

	let user;
	try {
		user = await User.findById(req.user._id).select("+password");
		if (!user) {
			return next(new HttpError(404, "Not Found"));
		}
		const isMatch = await compareHash(oldPassword, user.password);
		console.log(isMatch);
		if (!isMatch) {
			return next(new HttpError(404, "Invalid Request"));
		}
		hashedPassword = getHash(newPassword);

		user = await User.findByIdAndUpdate(req.user._id, {
			password: hashedPassword,
		});

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		next(error);
	}
};
