// models
const User = require("./../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate("videos")
      .populate("followers")
      .populate("followedes");
    return res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log("AUTHENTICATED", req.user);

    const userFound = await User.findById(userId);
    if (!userFound) {
      throw new Error("User followed not found");
    }

    // save in followedes
    const userUpdatedAuth = await User.findByIdAndUpdate(req.user.id, {
      $push: { followedes: userFound._id },
    });
    if (!userUpdatedAuth) {
      throw new Error("Could not save user in followed");
    }

    // save in followers
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $push: { followers: req.user.id },
    });
    if (!userUpdate) {
      throw new Error("Could not save user in follower");
    }

    return res.status(200).json({ data: "Follow user successfully" });
  } catch (error) {
    next(error);
  }
};

const rejectUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log("AUTHENTICATED", req.user);

    const userFound = await User.findById(userId);
    if (!userFound) {
      throw new Error("User followed not found");
    }

    // delete in followedes
    const userUpdatedAuth = await User.findByIdAndUpdate(req.user.id, {
      $pull: { followedes: userFound._id },
    });
    if (!userUpdatedAuth) {
      throw new Error("Could not delete user in followed");
    }

    // save in followers
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $pull: { followers: req.user.id },
    });
    if (!userUpdate) {
      throw new Error("Could not delete user in follower");
    }

    return res.status(200).json({ data: "Reject user successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, followUser, rejectUser };
