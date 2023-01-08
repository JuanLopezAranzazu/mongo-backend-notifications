// models
const Notification = require("./../models/Notification");

const getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({})
      .populate("sender")
      .populate("recipient");
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

const getNotificationsByUser = async (req, res, next) => {
  try {
    console.log("AUTHENTICATED", req.user);
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender")
      .populate("recipient");
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByUser,
};
