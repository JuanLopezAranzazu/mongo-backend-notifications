const express = require("express");
const router = express.Router();

// controllers
const {
  getAllUsers,
  followUser,
  rejectUser,
} = require("./../controllers/User");
// middlewares
const { verifyToken } = require("./../middlewares/Authenticated");

router.get("/", getAllUsers);
router.post("/follow", verifyToken, followUser);
router.delete("/reject", verifyToken, rejectUser);

module.exports = router;
