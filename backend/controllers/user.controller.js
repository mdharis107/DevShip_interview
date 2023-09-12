const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { UserModel } = require("../models/user.models");

const signUp = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  const username_check = await UserModel.findOne({ username });
  const email_check = await UserModel.findOne({ email });

  if (username_check || email_check) {
    res.status(401).send({ msg: "User already exists" });
  } else {
    bcrypt.hash(password, 6, async function (err, hash) {
      if (err) {
        res
          .status(500)
          .send({ msg: "Something went wrong, Please try again later" });
      }
      const user = new UserModel({
        first_name,
        last_name,
        email,
        username,
        password: hash,
      });
      try {
        await user.save();
        res.status(200).send({ msg: "Sign in successful" });
      } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Something went wrong, please try again" });
      }
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404).send({ msg: "User does not exist" });
  } else {
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        console.log(err);
        res
          .status(501)
          .send({ msg: "Something went wrong, please try again later " });
      }
      if (result) {
        // const token = jwt.sign({ email: user.email }, process.env.PRIVATE_KEY);
        res.status(200).send({ msg: "Login successful" });
      } else {
        res
          .status(500)
          .send({ msg: "Invalid credentials, please try again later " });
      }
    });
  }
};

module.exports = { signUp, login };
