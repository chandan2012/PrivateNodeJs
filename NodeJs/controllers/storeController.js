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

exports.getFavouriteHomes = (req, res, next) => {
  Favourite.fetchHomes((registeredID) => {    
    Home.fetchHomes((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => registeredID.includes(home.id));
      res.render("store/favourite", { homes: favouriteHomes, title: "Favourites" });
    });   
  });
};


exports.postFavouriteHomes = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourite(homeId, (err) => {
    if(err){
      console.log("Error while adding to favourites", err);
    }
    res.redirect("/favourite");
  });
}

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

