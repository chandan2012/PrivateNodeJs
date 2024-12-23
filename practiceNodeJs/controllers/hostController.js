const Home = require("../models/home");

exports.getHomes = (req, res) => {
  res.render("host/edit-home", { title: "Add Home" });
};

exports.postHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save((err) => {
    if (err) {
      res.redirect("/");
    } else {
      Home.fetchAllHomes((homes) => {
        res.render("host/host-homes", {
          title: "Host Homes",
          homeObj: homes,
        });
      });
    }
  });
};

exports.getHostHomes = (req, res) => {
  Home.fetchAllHomes((homes) => {
    res.render("host/host-homes", {
      title: "Host Homes",
      homeObj: homes, // Pass the homes array to the template
    });
  });
};
