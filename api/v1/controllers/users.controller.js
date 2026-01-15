const { ExpressValidator } = require("express-validator");
const { validationResult } = new ExpressValidator();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10; //Mot nhet vo .env sau
const privateKey = "Shinonome Ena"; //Mot nhet vo .env sau

const User = require(".././models/user.model");

class usersController {
  //[POST] /api/v1/users/register
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors });
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(403).json({
        message: "Email da co nguoi khac su dung, vui long chon email khac",
      });

    const salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({
      message: "Dang ki tai khoan thanh cong !",
      user: newUser,
    });
  }

  //[POST] /api/v1/users/login
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: errors });
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      const passwordMatched =
        user && (await bcrypt.compare(req.body.password, user.password));
      if (!passwordMatched) {
        return res.status(401).json({ message: "Sai email hoac mat khau!" });
      }

      const token = jwt.sign(
        { userId: user._id, fullName: user.fullName },
        privateKey,
      );

      res.json({
        message: "Dang nhap thanh cong !",
        token,
      });
    } catch (err) {
      return res.status(500).json({ message: "Uh oh server sap roi" });
    }
  }

  //[GET] /api/v1/users/detail
  async detail(req, res) {
    res.json({
      userInfo: req.user,
    });
  }

  //[GET] /api/v1/users/list
  async list(req, res) {
    const userList = await User.find({ _id: { $ne: req.user.userId } }).select(
      "-password",
    );
    res.json({
      userList,
    });
  }
}

module.exports = new usersController();
