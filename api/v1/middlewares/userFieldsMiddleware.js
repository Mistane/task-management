const { ExpressValidator } = require("express-validator");
const { body } = new ExpressValidator();

const validationRegisterRules = [
  body("fullName").notEmpty().withMessage("Ten khong duoc de trong"),
  body("email").notEmpty().withMessage("Email khong duoc de trong"),
  body("password").notEmpty().withMessage("Password khong duoc de trong"),
];

const validationLoginRules = [
  body("email").notEmpty().withMessage("Email khong duoc de trong"),
  body("password").notEmpty().withMessage("Password khong duoc de trong"),
];

module.exports = {
  checkRegister: validationRegisterRules,
  checkLogin: validationLoginRules,
};
