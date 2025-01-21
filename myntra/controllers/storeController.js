const Home = require("../models/home");

exports.getStores = async (req, res) => {
  const homes = await Home.find();
  res.render("store/index", { title: "Home page", isLoggedIn: req.session.isLoggedIn, Homes: homes,
    user: req.session.user, });
};
