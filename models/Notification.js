const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    notificationType: {
      type: String,
      trim: true,
    },
    opened: { type: Boolean, default: false },
    entityId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

NotificationSchema.statics.addNotification = async (
  to,
  from,
  notificationType,
  entityId
) => {
  let notif = { to, from, notificationType, entityId };

  try {
    await Notification.deleteOne(notif);
    return Notification.create(notif);
  } catch (err) {
    console.log(err);
  }
};

const Notification = mongoose.model("notification", NotificationSchema);
module.exports = Notification;
