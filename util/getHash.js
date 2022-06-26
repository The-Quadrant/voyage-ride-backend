const bcrypt = require("bcryptjs");
const HttpError = require("./HttpError");

const getHash = (password) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		hashedPassword = bcrypt.hashSync(password, salt);
		return hashedPassword;
	} catch (error) {
		throw error;
	}
};

const compareHash = async (password, hashedPassword) => {
	try {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	} catch (error) {
		throw error;
	}
};

module.exports = { getHash, compareHash };
