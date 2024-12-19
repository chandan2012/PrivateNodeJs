const Home = require("../models/home");

exports.getStore = (req, res, next) => {
      Home.fetchHomes(registeredHomes =>{
        res.render("index", { registeredHomes: registeredHomes, title:"Home" });
      });      
};