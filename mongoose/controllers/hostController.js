const Home = require("../models/home");
const User = require("../models/user");
const { deleteFile } = require("../util/file");

exports.getHome = (req, res, next) => {
  res.render("host/edit-home", {
    title: "Add Home",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHomes = (req, res, next) => {
  const homeId = req.params.id;
  const editing = req.query.editing === "true";
  if (!editing) {
    res.redirect("/host-homes");
  }
  Home.findById(homeId).then((home) => {
    if (!home) return res.redirect("/host-homes");
    res.render("host/edit-home", {
      editing: editing,
      home: home,
      title: "Edit Home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  console.log('Req body: ', req.body);
  console.log('House Photo: ', req.file);
  if (!req.file) {
    return res.status(400).send('No valid image provided');
  }
  const photoUrl = "/" + req.file.path;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    hostId: req.session.user._id,
  });
  home
    .save()
    .then(() => {
      res.redirect("/host-homes");
    })
    .catch((err) => console.log(err));
};

exports.postEditHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description, id } =
    req.body;
  Home.findById(id)
    .then((home) => {
      if (!home) return res.redirect("/host-homes");
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      if (req.file) {
        deleteFile(home.photoUrl.substring(1));
        home.photoUrl = "/" + req.file.path;;
      }
     
      home.description = description;
      return home.save();
    })
    .finally(() => {
      res.redirect("/host-homes");
    });
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.id;
  try {
    const home = await Home.findById(homeId);    
    if (!home) {
      return res.status(404).send("Home not found");
    }  
    deleteFile(home.photoUrl.substring(1));

    await Home.findByIdAndDelete(homeId);
    await User.updateMany(
    { favouriteHomes: homeId },
    { $pull: { favouriteHomes: homeId } }
    );
    res.redirect("/host-homes");
  } catch (err) {
    console.error("Error deleting home or updating users:", err);
    res.status(500).send("Error processing request");
  }
};

exports.getHostHomes = (req, res, next) => {
  Home.find({ hostId: req.session.user._id }).then((registeredHomes) => {
    res.render("host/host-homes", {
      registeredHomes: registeredHomes,
      title: "Host Homes",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};
