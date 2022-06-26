const jwt = require("jsonwebtoken");
const getToken = (info) => {
	try {
		const token = jwt.sign(info, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});
		return token;
	} catch (error) {
		throw error;
	}
};

module.exports = getToken;
