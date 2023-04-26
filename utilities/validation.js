const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const baseUrl = require("../hosturl");

const createProjectValidation = [
  body("name")
    .trim()
    .isLength({ min: 15, max: 50 })
    .withMessage("Project name must be between 15 and 50 characters"),
  body("image")
    .custom((value) => {
      if (value.includes(baseUrl)) {
        return true;
      }
      const base64EncodedImage = value.split(",");
      const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
      if (data[0] !== "image") {
        throw new Error("");
      }
      try {
        Buffer.from(base64EncodedImage[1], "base64");
      } catch (error) {
        console.log(error);
        throw new Error("");
      }
      return true;
    })
    .withMessage(
      "Project image must be an image jpge or png and less than 5 megabyte"
    ),
  body("description")
    .trim()
    .isLength({ min: 100, max: 500 })
    .withMessage("Description must be between 100 and 500 characters"),
  body("goal")
    .isCurrency()
    .withMessage("Enter target amount in a currency unit"),
  body("start_date")
    .trim()
    .isISO8601()
    .withMessage("Select start date for donation"),
  body("end_date")
    .trim()
    .isISO8601()
    .withMessage("Select end date for donation"),
  body("status").trim().isString().withMessage("Select status for donation"),
];

const editProjectValidation = [
  body("name")
    .trim()
    .isLength({ min: 15, max: 50 })
    .withMessage("Project name must be between 15 and 50 characters"),
  body("image")
    .custom((value) => {
      if (value.includes(baseUrl)) {
        return true;
      }
      const base64EncodedImage = value.split(",");
      const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
      if (data[0] !== "image") {
        throw new Error("");
      }
      try {
        Buffer.from(base64EncodedImage[1], "base64");
      } catch (error) {
        console.log(error);
        throw new Error("");
      }
      return true;
    })
    .withMessage(
      "Project image must be an image jpge or png and less than 5 megabyte"
    ),
  body("description")
    .trim()
    .isLength({ min: 100, max: 500 })
    .withMessage("Description must be between 100 and 500 characters"),
  body("goal")
    .isCurrency()
    .withMessage("Enter target amount in a currency unit"),
  body("start_date")
    .trim()
    .isISO8601()
    .withMessage("Select start date for donation"),
  body("end_date")
    .trim()
    .isISO8601()
    .withMessage("Select end date for donation"),
  body("status").trim().isString().withMessage("Select status for donation"),
];

const searchProjectValidation = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Project name must be between 1 and 50 characters"),
  body("goal")
    .isCurrency()
    .withMessage("Enter target amount in a currency unit"),
  body("start_date")
    .trim()
    .isISO8601()
    .withMessage("Select start date for donation"),
  body("status").trim().isString().withMessage("Select status for donation"),
];

const createUserValidation = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must be between 5 and 50 characters"),
  body("avatar")
    .custom((value) => {
      if (value.includes(baseUrl)) {
        return true;
      }
      const base64EncodedImage = value.split(",");
      const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
      if (data[0] !== "image") {
        throw new Error("");
      }
      try {
        Buffer.from(base64EncodedImage[1], "base64");
      } catch (error) {
        console.log(error);
        throw new Error("");
      }
      return true;
    })
    .withMessage(
      "Avatar must be an image jpge or png and less than 5 megabyte"
    ),
  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  body("phone")
    .isMobilePhone()
    .withMessage("Input data must be in phone number format"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Input data must be in email format and email must unique")
    .custom((value) => {
      const checkEmail = async () => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("This email already exists");
        } else {
          return true;
        }
      };
      return checkEmail();
    }),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special characters"
    ),
  body("role")
    .trim()
    .isString()
    .withMessage("Select user role, be user or admin"),
];

const editUserValidation = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must be between 5 and 50 characters"),
  body("avatar")
    .custom((value) => {
      if (value.includes(baseUrl)) {
        return true;
      }
      const base64EncodedImage = value.split(",");
      const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
      if (data[0] !== "image") {
        throw new Error("");
      }
      try {
        Buffer.from(base64EncodedImage[1], "base64");
      } catch (error) {
        console.log(error);
        throw new Error("");
      }
      return true;
    })
    .withMessage(
      "Avatar must be an image jpge or png and less than 5 megabyte"
    ),
  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  body("phone")
    .isMobilePhone()
    .withMessage("Input data must be in phone number format"),
  body("role")
    .trim()
    .isString()
    .withMessage("Select user role, be user or admin"),
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("please input your email"),
  body("password")
    .trim()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Please enter password"),
];

const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must be between 5 and 50 characters"),
  body("avatar")
    .custom((value) => {
      if (value.includes(baseUrl)) {
        return true;
      }
      const base64EncodedImage = value.split(",");
      const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
      if (data[0] !== "image") {
        throw new Error("");
      }
      try {
        Buffer.from(base64EncodedImage[1], "base64");
      } catch (error) {
        console.log(error);
        throw new Error("");
      }
      return true;
    })
    .withMessage(
      "Avatar must be an image jpge or png and less than 5 megabyte"
    ),
  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  body("phone")
    .isMobilePhone()
    .withMessage("Input data must be in phone number format"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Input data must be in email format and email must unique")
    .custom((value) => {
      const checkEmail = async () => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("This email already exists");
        } else {
          return true;
        }
      };
      return checkEmail();
    }),
];

const userUpdatePasswordValidation = [
  body("name")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must be between 5 and 50 characters"),
  body("email").trim().isEmail(),
  body("avatar")
    .custom((value) => {
      if (value.includes(baseUrl)) {
        return true;
      }
      const base64EncodedImage = value.split(",");
      const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
      if (data[0] !== "image") {
        throw new Error("");
      }
      try {
        Buffer.from(base64EncodedImage[1], "base64");
      } catch (error) {
        console.log(error);
        throw new Error("");
      }
      return true;
    })
    .withMessage(
      "Avatar must be an image jpge or png and less than 5 megabyte"
    ),
  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),
  body("phone")
    .isMobilePhone()
    .withMessage("Input data must be in phone number format"),
  body("newPassword")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special characters"
    ),
];

const forgetPasswordValidation = [
  body("email").trim().isEmail().withMessage("Enter your email"),
];

const addDonationValidation = [
  body("userEmail").trim().isEmail().withMessage("You shoun"),
];

module.exports = {
  createUserValidation,
  editUserValidation,
  createProjectValidation,
  searchProjectValidation,
  editProjectValidation,
  loginValidation,
  registerValidation,
  userUpdatePasswordValidation,
  forgetPasswordValidation,
};
