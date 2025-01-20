const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

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
  check("username").trim().notEmpty().withMessage("Please enter a username."),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  check("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  check("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
  check("userType")
    .trim()
    .notEmpty()
    .isIn(["user", "admin"])
    .withMessage("Please select a user type."),

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
