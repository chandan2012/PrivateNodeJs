exports.getLogin = (req, res, next) => {
  res.render("auth/login", { title: "Login page", isLoggedIn: false });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
exports.postLogout = (req, res, next) => {
  // res.seassion.isLoggedIn = false;
  res.redirect("/login");
};
