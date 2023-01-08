// models
const User = require("./../models/User");
const Video = require("./../models/Video");
const Notification = require("./../models/Notification");

const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({}).populate("user");
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const getVideosByUser = async (req, res, next) => {
  try {
    console.log("AUTHENTICATED", req.user);
    const videos = await Video.find({ user: req.user.id }).populate("user");
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log("AUTHENTICATED", req.user);

    const newVideo = new Video({ title, description, user: req.user.id });
    const videoSaved = await newVideo.save();

    // save array videos
    const userUpdated = await User.findByIdAndUpdate(req.user.id, {
      $push: { videos: videoSaved._id },
    });

    if (!userUpdated) {
      throw new Error("An error occurred while saving the video");
    }

    // save notifications for users followers
    const userFound = await User.findById(req.user.id).populate("followers");
    const entryArray = userFound.followers.map((id) => {
      const dataForNotification = {
        sender: userFound._id,
        recipient: id,
        message: `User ${userUpdated.username} has created a new video`,
      };
      return dataForNotification;
    });
    console.log(entryArray);

    const notificationSaved = await Notification.insertMany(entryArray);

    if (!notificationSaved) {
      throw new Error("An error occurred while saving notifications");
    }

    res.status(201).json(videoSaved);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllVideos, getVideosByUser, createVideo };
