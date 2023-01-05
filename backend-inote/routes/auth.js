const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUsers");
const secretKey = "Secretkey";
console.log(secretKey);
console.log(secretKey + "-secret key from env");
// console.log(process.env);
// Route-1-create a user
router.post(
  "/createUser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a Valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = User.findOne({ email: req.body.email }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Results : ", docs);
        }
      });
      if (!user === null) {
        return res.status(400).json({
          success,
          status: "Failed1",
          message: "user already exists",
        });
      }
      console.log(req.body);
      //salt and pepper are additional elements added to your password before hashing salt is stored in database but pepper is stored in backend
      let salt = await bcrypt.genSalt(10);
      let securePassword = await bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      // to keep auth-token-active-for 1-hr
      // const authToken = jwt.sign(data, secretKey, {
      //   expiresIn: "1h",
      // });
      const authToken = jwt.sign(data, secretKey);
      console.log(authToken);
      console.log("Final request");
      success = true;
      return res.json({ success, authToken });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Internal Server Error-1");
    }
  }
);
// Route-2-authenticate a user
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a Valid password").exists(),
  ],
  async (req, res) => {
    let success = false;
    console.log("In LOGIN");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        success = false;
        return res
          .status(500)
          .json({ error: "please enter correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(500)
          .json({ success, error: "please enter correct credentials" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, secretKey);
      console.log(authToken);
      success = true;
      return res.json({ success, authToken });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);
//Route-3 get logged-in user details /getUser
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.user.id;
    const user = await User.findById(userId).select("-password");
    console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
