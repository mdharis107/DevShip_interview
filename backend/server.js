const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");
const { authentication } = require("./middlewares/authentication");

const app = express();
app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/user", UserRouter);

// app.use(authentication);

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("Connection to database is established");
  } catch (err) {
    console.log(err);
  }
  console.log(`The port:${PORT} is running `);
});
