const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
    res.render("host/edit-home", {
      title: "Host Your Home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      editing: false
    });
};

exports.postAddHome = async (req, res, next) => {
  const {houseName, price, location, rating, photoUrl, description} = req.body;  
  try{
    const home = new Home({
      houseName: houseName,
      price: price,
      location: location, 
      rating: rating,
      photoUrl: photoUrl, 
      description: description,
  });
  await home.save();
  res.redirect("/host-homes");
  }
  catch(err){
    console.log(err);
  }
};

exports.getHomes = async (req, res, next) => {
  const homes = await Home.find();
  res.render("host/host-homes", {
    title: "Host Homes",
    Homes: homes,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
    editing: false
  });
};

exports.getEditHome = async (req, res, next) => {  
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  if (!editing) {
    return res.redirect("/host/host-homes");
  }
  const editHome = await Home.findById(homeId)
  res.render("host/edit-home", {
    editing: editing,
    Homes: editHome,
    title: "Edit Home",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });  
};

exports.postEditHome = async (req, res, next) => {  
  const {houseName, price, location, rating, photoUrl, description,} = req.body;
  try{
    const home = await Home.findById(req.body.id);
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    await home.save();
    res.redirect("/host-homes");
  }
  catch(err){
    console.log(err);
  }
}

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;

  try{
    const home = await Home.findById(homeId);
    await home.deleteOne();
    res.redirect("/host-homes");
  }
  catch(err){
    console.log(err);
  }
};