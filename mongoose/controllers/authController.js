const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { userName, email, userType, confirmPassword, password } = require("./validation");

exports.getLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/");
  }
  res.render("auth/login", { title: "Login page", isLoggedIn: false });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { title: "Signup page", isLoggedIn: false });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      throw new Error("User not found!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password does not match");
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save();

    res.redirect("/");
  } catch (err) {
    res.render("auth/login", {
      title: "Login",
      isLoggedIn: false,
      errorsMsg: [err.message],
    });
  }
};

exports.postSignup = [
  userName,
  email,
  password,
  confirmPassword,
  userType,

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        title: "Signup Page",
        isLoggedIn: false,
        errorsMsg: errors.array().map((error) => error.msg), // Pass errorsMsg as an array of messages
        oldInput: req.body,
      });
    }
    const { username, email, password, userType } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        userType,
      });
      await user.save();

      
    } catch (err) {
      return res.status(422).render("auth/signup", {
        title: "Login",
        isLoggedIn: false,
        errorsMsg: [err],
        oldInput: req.body,
      });
    }
  },
];

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};
