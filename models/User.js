const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followedes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("totalVideos").get(function () {
  return this.videos.length;
});

const User = model("User", userSchema);

module.exports = User;
