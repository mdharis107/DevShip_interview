const { Router } = require("express");
const { signUp, login } = require("../controllers/user.controller");

const UserRouter = Router();

UserRouter.post("/signup", signUp);

UserRouter.post("/login", login);

module.exports = { UserRouter };
