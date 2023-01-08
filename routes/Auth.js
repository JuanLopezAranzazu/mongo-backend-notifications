const express = require("express");
const router = express.Router();

// controllers
const { registerUser, loginUser } = require("./../controllers/Auth");
// middlewares
const { checkExistingUser } = require("./../middlewares/VerifyUser");

router.post("/register", checkExistingUser, registerUser);
router.post("/login", loginUser);

module.exports = router;
