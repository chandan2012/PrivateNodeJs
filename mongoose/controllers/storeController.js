const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  console.log(req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      title: "Home",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/homes", {
      registeredHomes: registeredHomes,
      title: "Homes",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getFavouriteHomes = (req, res, next) => {
  Favourite.find()
    .populate("homeId")
    .then((favIds) => {
      const favouriteHomes = favIds.map((favId) => favId.homeId);
      res.render("store/favourite", {
        homes: favouriteHomes,
        title: "Favourites",
        isLoggedIn: req.session.isLoggedIn,
      });
    });
};

exports.postFavouriteHomes = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite({ homeId });
  fav
    .save()
    .then((result) => {
      res.redirect("/favourite");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/favourite");
    });
};

exports.postDeleteFavouriteHomes = (req, res, next) => {
  const homeId = req.params.id;
  Favourite.findOneAndDelete({ homeId })
    .then(() => {
      res.redirect("/favourite");
    })
    .catch((err) => {
      res.redirect("/favourite");
      console.log(err);
    });
};

exports.getHomeDetails = (req, res, next) => {
  const hostID = req.params.id;
  Home.findById(hostID).then((homes) => {
    console.log(homes);
    res.render("store/home-details", {
      title: "Home Details",
      home: homes,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};
