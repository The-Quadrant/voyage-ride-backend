const mongoose = require("mongoose");

const connect = async (callback) => {
	try {
		console.log("connecting to database");
		await mongoose.connect(process.env.MONGO_URI);
		console.log("connected to database");
		callback;
	} catch (error) {
		console.log(error);
	}
};

module.exports = connect;
