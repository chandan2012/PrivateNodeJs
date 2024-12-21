const Home = require("../models/home");

exports.getHome = (req, res, next) => { 
  res.render("host/add-home", { title: "Add Home" });
};
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save((err) => {
    err
      ? res.redirect("/")
      : res.render("host/home-added", { title: "Home Added" });
  });
};
