const User = require("../model/User");

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		next(error);
	}
};
