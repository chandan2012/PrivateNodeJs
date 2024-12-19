const Home = require("../models/home");


exports.getHome = (req, res, next) => {
  res.render("add-home", { title: "Add Home" });
};
exports.postAddHome = (req, res, next) => {
  const  {houseName,price,location,rating,photoUrl} = req.body;
  const home = new Home(houseName,price,location,rating,photoUrl);
  home.save(err =>{
    if(err){
      res.redirect('/')
    }
    else{
      res.render("home-added", { title: "Home Added" });
    }
  });
  
};

