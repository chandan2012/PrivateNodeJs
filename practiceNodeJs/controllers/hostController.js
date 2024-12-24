const Home = require("../models/home");

exports.getHomes = (req, res) => {
  res.render("host/edit-home", { title: "Add Home" ,editing: false });
};

exports.postHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save((err) => {
    if (err) {
      res.redirect("/");
    } else {
      Home.fetchAllHomes((homes) => {
        res.render("host/host-homes", {
          title: "Host Homes",
          homeObj: homes,
        });
      });
    }
  });
};

exports.getEditHome = (req, res) => {
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  if(!editing) {  
    res.redirect("/host-homes");
  }
  Home.findById(homeId, (home) => {
    if(!home) {
      res.redirect("/host-homes");
    }
    res.render("host/edit-home", { editing: editing, homeObj: home, title: "Edit Home" });
  });  
};

exports.postEditHome = (req, res) => {
  const {id, houseName, price, location, rating, imageUrl } = req.body;
  const home = new Home(houseName, price, location, rating, imageUrl);
  home.id = id;
  home.save((err) => {
    if (err) {
      console.log("Error while updating home", err);
    } else {
      res.redirect("/host-homes");
    }
  });
};    

exports.getHostHomes = (req, res) => {
  Home.fetchAllHomes((homes) => {
    res.render("host/host-homes", {
      title: "Host Homes",
      homeObj: homes, // Pass the homes array to the template
    });
  });
};
