const express = require("express");
const app = express();
// connection db
require("./database");

const { PORT } = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initial db
const User = require("./models/User");
const { hashPassword } = require("./tools/Password");

const createUser = async (entryUsers) => {
  try {
    // Count Documents
    const count = await User.estimatedDocumentCount();

    // check for existing users
    if (count > 0) return;

    // hash of password
    for (const user of entryUsers) {
      const passwordHash = await hashPassword(user.password);
      user.password = passwordHash;
    }
    console.log(entryUsers);

    User.insertMany(entryUsers, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
};
createUser([{ email: "admin", username: "admin", password: "admin" }]);

// routes
const authRouter = require("./routes/Auth");
const videoRouter = require("./routes/Video");
const notificationRouter = require("./routes/Notification");
const userRouter = require("./routes/User");

app.use("/auth", authRouter);
app.use("/video", videoRouter);
app.use("/notification", notificationRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("SERVER RUNNING IN PORT", PORT);
});
