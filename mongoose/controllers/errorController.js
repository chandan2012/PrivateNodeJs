exports.get404 = (req, res, next) => {
  res.statusCode = 404;
  res.render("404", {
    title: "Page Not Found",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
