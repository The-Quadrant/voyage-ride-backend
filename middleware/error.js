exports.error = (error, req, res, next) => {
	if (error.name === "ValidationError") {
		const mssg = Object.values(error.errors).map((error) => error.message);
		error.code = 404;
		error.message = mssg;
	}
	console.log(error);

	res.status(error.code || 500).json({
		success: false,
		message: error.message || "Server Error",
	});
};
