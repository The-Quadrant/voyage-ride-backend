const express = require("express");
const { getUsers } = require("../controller/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getUsers);

module.exports = router;
