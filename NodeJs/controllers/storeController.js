const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchHomes((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      title: "Home",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchHomes((registeredHomes) => {
    res.render("store/homes", {
      registeredHomes: registeredHomes,
      title: "Homes",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.favouriteHomes(favouriteIds => {
    Home.fetchHomes(registeredHomes => {
      const favouriteHomes = registeredHomes.filter(home => favouriteIds.includes(home.id));
      res.render("store/fav", { favouriteHomes : favouriteHomes, title: "Favourites" });
    });
  })
};

exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  console.log(homeId);
  Favourite.addToFavourites(homeId, error => {
    if (error) {
      console.log("Error while adding to favourites", error);
    }
    res.redirect("/favorite-homes");
  })
};


exports.getHomeDetails = (req, res, next) => {
  const hostID = req.params.id;
  Home.findById(hostID, (home) => {
    if(!home) { 
      return res.redirect("/homes"); 
    } 
    res.render("store/home-details", {
      title: "Home Details",
      home: home,
    });
  }); 

  
 
};

