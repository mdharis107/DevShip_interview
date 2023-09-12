const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ msg: "Please login" });
  }
  const token = req.headers.authorization;

  jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
    if (err) {
      res.send({ msg: err.message });
    } else {
      req.body.email = decoded.email;
      next();
    }
  });
};

module.exports = { authentication };
