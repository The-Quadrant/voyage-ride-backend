const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

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
// cors
const corsOptions = {
	origin: "https://haampr.herokuapp.com",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// public
app.use(express.static(path.join(__dirname, "public")));

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
