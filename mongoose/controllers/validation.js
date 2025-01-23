const { check } = require("express-validator");

exports.userName = check("username").trim().notEmpty().withMessage("Please enter a username.");

exports.email = check("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail();

exports.password = check("password").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters long.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");

exports.confirmPassword = check("confirm_password").trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
        }
        return true;
    });

exports.userType = check("userType").trim().notEmpty().isIn(["user", "admin"]).withMessage("Please select a user type.");