const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
