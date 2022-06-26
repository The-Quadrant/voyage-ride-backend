const HttpError = require("../util/HttpError");
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
	let token;
	if (req.headers && req.headers.authorization) {
		token = req.headers.authorization.split(" ")[1]; // Bearer token
	}

	if (!token) {
		return next(new HttpError(401, "Unauthorized"));
	}
	try {
		var decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return next(new HttpError(401, "Unauthorized"));
		}
		req.user = decoded.user;
		next();
	} catch (err) {
		next(err);
	}
};
