const jwt = require("jsonwebtoken");
// models
const User = require("./../models/User");
// tools
const { hashPassword, verifyPassword } = require("./../tools/Password");
const { JWT_SECRET } = require("./../config");

const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // hash
    const passwordHash = await hashPassword(password);
    const newUser = new User({ email, username, password: passwordHash });
    // save user db
    const userSaved = await newUser.save();
    // create token
    const token = await jwt.sign(
      { id: userSaved._id, username: userSaved.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userFound = await User.findOne({ username });
    if (!userFound) {
      throw new Error("User not found");
    }
    // verify
    const passwordCorrect = await verifyPassword(userFound.password, password);
    if (!passwordCorrect) {
      throw new Error("Incorrect password");
    }
    // create token
    const token = await jwt.sign(
      { id: userFound._id, username: userFound.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
