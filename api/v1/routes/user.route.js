const express = require("express");
const router = express.Router();
const usersController = require(".././controllers/users.controller");
const {
  checkRegister,
  checkLogin,
} = require(".././middlewares/userFieldsMiddleware");
const authenMiddleware = require(".././middlewares/checkAuthentication");

router.post("/register", checkRegister, usersController.register);
router.post("/login", checkLogin, usersController.login);
router.get("/detail", authenMiddleware, usersController.detail);
router.get("/list", authenMiddleware, usersController.list);

module.exports = router;
