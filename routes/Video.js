const express = require("express");
const router = express.Router();

// controllers
const {
  getAllVideos,
  getVideosByUser,
  createVideo,
} = require("./../controllers/Video");
// middlewares
const { verifyToken } = require("./../middlewares/Authenticated");

router.get("/", getAllVideos);
router.get("/user", verifyToken, getVideosByUser);
router.post("/", verifyToken, createVideo);

module.exports = router;
