const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchHomes().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      title: "Home",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchHomes().then((registeredHomes) => {
    res.render("store/homes", {
      registeredHomes: registeredHomes,
      title: "Homes",
    });
  });
};

exports.getFavouriteHomes = (req, res, next) => {
  Favourite.fetchHomes().then((favIds) => {
    Home.fetchHomes().then((registeredHomes) => {
      favIds = favIds.map((favId) => favId.id);
      console.log(favIds, registeredHomes);
      const favouriteHomes = registeredHomes.filter((home) =>
        favIds.includes(home._id.toString())
      );

      res.render("store/favourite", {
        homes: favouriteHomes,
        title: "Favourites",
      });
    });
  });
};

exports.postFavouriteHomes = (req, res, next) => {
  const homeId = req.body.id;
  const favId = new Favourite(homeId);
  favId
    .save()
    .then(() => {
      res.redirect("/favourite");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/favourite");
    });
};

exports.postDeleteFavouriteHomes = (req, res, next) => {
  const homeId = req.params.id;
  Favourite.deleteFromFavourite(homeId)
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
    });
  });
};
