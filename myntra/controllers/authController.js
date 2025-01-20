const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");

exports.getSignup = (req, res) => {
    res.render("auth/signup", { title: "Sign Up" , isLoggedIn: false});
};

exports.getLogin = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect("/");
      }
    res.render("auth/login", { title: "Login" , isLoggedIn: false});
};

exports.postSignup = [
    check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
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

    async (req, res) => {
        
    console.log(req);
    const { name, email, password,userType } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).render("auth/signup", {
        title: "Sign Up",
        isLoggedIn: false,
        errorsMsg: errors.array().map((error) => error.msg), // Pass errorsMsg as an array of messages
        oldInput: req.body,
    });
    };
    try{
       
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          userType,
        });
        await user.save();
    }
    catch(err){
        console.log(err);
        return res.status(422).render("auth/signup", {
            title: "Sign Up",
            isLoggedIn: false,
            errorsMsg: [err],
            oldInput: req.body,
        });
    }

    res.redirect("/login");
}
];

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    
  const user = await User.findOne({ email: email });
   
    try{
        if (!user) {
            throw new Error("Invalid email or password")
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Invalid email or password")
            }
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save();

            res.redirect("/");
    }
    catch(err){
        console.log(err);
        return res.status(422).render("auth/login", {
            title: "Login",
            isLoggedIn: false,
            errorsMsg: ["Invalid email or password"],
        })
    }    
};

exports.postLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/login");
};