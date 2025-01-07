const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  res.render("host/edit-home", { title: "Add Home", editing: false });
};

exports.getEditHomes = (req, res, next) => {
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  if (!editing) {
    res.redirect("/host-homes");
  }
  Home.findById(homeId, (home) => {
    if (!home) {
      res.redirect("host/host-homes");
    }
    res.render("host/edit-home", {
      editing: editing,
      home: home,
      title: "Edit Home",
    });
  });
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

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save((err) => {
    if (err) {
      console.log("Error while updating home", err);
    } else {
      res.redirect("/host-homes");
    }
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id;
  console.log(homeId);
  Home.deleteHome(homeId, (err) => {
    if (err) {
      console.log("Error while deleting home", err);
    } else {
      res.redirect("/host-homes");
    }
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchHomes((registeredHomes) => {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      title: "Host Homes",
    });
  });
};
