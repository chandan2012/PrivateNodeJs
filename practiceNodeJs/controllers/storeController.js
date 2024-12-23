const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHomes = (req, res) => {
  Home.fetchAllHomes((homes) => {
    res.render("user/index", {
      title: "Home Page",
      homeObj: homes, // Pass the homes array to the template
    });
  });
};


exports.getFavouriteHomes = (req, res, next) => {
  Favourite.fetchHomes((registeredID) => {    
    Home.fetchAllHomes((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => registeredID.includes(home.id));
      res.render("user/favourite", { homeObj: favouriteHomes, title: "Favourites" });
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
      return res.redirect("/"); 
    } 
    res.render("user/home-details", {
      title: "Home Details",
      home: home,
    });
  }); 
};