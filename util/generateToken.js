const crypto = require("crypto");

const generateToken = () => {
	const token = crypto.randomBytes(20).toString("hex");
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
	return { token, hashedToken };
};

const generateHashedToken = (token) => {
	return crypto.createHash("sha256").update(token).digest("hex");
};

module.exports = { generateToken, generateHashedToken };
