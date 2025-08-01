const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const reg = async (req, res) => {
  try {
    const exists = await User.findOne({ uid: req.body.uid });
    if (exists) return res.send("acc exists");
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.send("acc created");
  } catch (err) {
    res.send("error in registration");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.body.uid });
    if (!user) return res.send("acc does not exist");
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.send("wrong password");
    const token = jwt.sign({ uid: user.uid, platform: user.platform }, `${process.env.JWT_SECRET}`, { expiresIn: "2h" });
    res.json({ token, name: user.name, platform: user.platform });
  } catch (err) {
    res.send("error in login");
  }
};

const islogin = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, `${process.env.JWT_SECRET}`);
    req.user = { uid: decoded.uid, platform: decoded.platform }; // not req.header
    next();
  } catch (err) {
    res.status(401).send("plz login first");
  }
};

module.exports = { reg, login, islogin };
