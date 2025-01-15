const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      title: "Home",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/homes", {
      registeredHomes: registeredHomes,
      title: "Homes",
    });
  });
};

exports.getFavouriteHomes = (req, res, next) => {
  Favourite.find().then((favIds) => {
    Home.find().then((registeredHomes) => {
      favIds = favIds.map((favId) => favId.id);
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

  // Check if the home is already in favourites
  Favourite.findOne({ id: homeId })
    .then((exists) => {
      if (!exists) {
        // If not, create a new favourite entry
        const fav = new Favourite({ id: homeId });
        return fav.save();
      }
    })
    .then(() => {
      res.redirect("/favourite");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/favourite");
    });
};

exports.postDeleteFavouriteHomes = (req, res, next) => {
  const homeId = req.params.id;
  Favourite.deleteOne({ id: homeId })
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
