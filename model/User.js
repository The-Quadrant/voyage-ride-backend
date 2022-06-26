const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a full name"],
		minLength: [4, "Name must be more than 4 or more characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter a valid email address"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please enter a valid email address",
		],
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	tel: {
		type: String,
		required: [true, "Please enter your phone number"],
	},
	resetPasswordToken: String,
	resetPasswordTokenExpiration: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.plugin(uniqueValidator, { message: "Email already exists" });
module.exports = mongoose.model("User", UserSchema);
