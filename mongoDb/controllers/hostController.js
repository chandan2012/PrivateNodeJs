const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  res.render("host/edit-home", { title: "Add Home", editing: false });
};

exports.getEditHomes = (req, res, next) => {
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  if (!editing) {
    res.redirect("/host-homes");
  }
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if(!home) return res.redirect("/host-homes");
    res.render("host/edit-home", {
      editing: editing,
      home: home,
      title: "Edit Home",
    });
  } 
);
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );
  home
    .save()
    .then(() => {
      res.render("host/home-added", { title: "Home Added" });
    })
    .catch((err) => console.log(err));
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );
  home.id = id;
  home
    .save()
    .then(() => {
      res.render("host-homes", { title: "Home Added" });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id;
  Home.deleteHome(homeId).then(() => {    
      res.redirect("/host-homes");    
  })
  .catch((err) => console.log(err));;
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchHomes().then(([registeredHomes]) => {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      title: "Host Homes",
    });
  });
};
