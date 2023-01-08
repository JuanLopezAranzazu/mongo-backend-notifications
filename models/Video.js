const { Schema, model } = require("mongoose");

const videSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Video = model("Video", videSchema);

module.exports = Video;
