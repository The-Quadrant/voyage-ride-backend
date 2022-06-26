const express = require("express");
const dotenv = require("dotenv");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const connect = require("./util/db.");
const { notFound } = require("./controller/notFound");
const { error } = require("./middleware/error");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
// parse json
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

// error middleware
app.use(error);

// catch al routes
app.use(notFound);

connect(
	app.listen(PORT, () => {
		console.log(`server running on port ${PORT}`);
	})
);
