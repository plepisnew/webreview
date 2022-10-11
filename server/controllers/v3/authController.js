const bcrypt = require("bcrypt");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const currentTime = Date.now();
    const disabledTime = new Date(user.disabledUntil).getTime();
    console.log(currentTime, disabledTime);
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET || "access"
      );
      return res.status(200).json({ accessToken, user });
      //   return res.status(200).json({ message: "Successfully authorized" });
    }
    res.status(400).json({ message: "Username or password incorrect" });
  } catch (err) {
    if (err.name === "TypeError")
      return res
        .status(400)
        .json({ message: `User ${req.body.username} does not exist` });
    res.status(400).json({ message: err.message });
  }
};

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({
        message: "Invalid user body. Username and password are required",
      });
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
};
