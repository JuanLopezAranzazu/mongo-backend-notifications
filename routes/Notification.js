const express = require("express");
const router = express.Router();

// controllers
const {
  getAllNotifications,
  getNotificationsByUser,
} = require("./../controllers/Notification");
// middlewares
const { verifyToken } = require("./../middlewares/Authenticated");

router.get("/", getAllNotifications);
router.get("/user", verifyToken, getNotificationsByUser);

module.exports = router;
