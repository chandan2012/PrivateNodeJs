const Favourite = require("../models/favorite");
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
  Home.findById(homeId).then((home) => {
    if (!home) return res.redirect("/host-homes");
    res.render("host/edit-home", {
      editing: editing,
      home: home,
      title: "Edit Home",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });
  home
    .save()
    .then(() => {
      res.redirect("/host-homes");
    })
    .catch((err) => console.log(err));
};

exports.postEditHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description, id } =
    req.body;
  Home.findById(id)
    .then((home) => {
      if (!home) return res.redirect("/host-homes");
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;
      return home.save();
    })
    .finally(() => {
      res.redirect("/host-homes");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id;
  Home.deleteOne({ _id: homeId })
    .then(() => {
      Favourite.deleteOne({ id: homeId }).then(() => {
        res.redirect("/host-homes");
      });
    })
    .catch((err) => console.log(err));
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      title: "Host Homes",
    });
  });
};
