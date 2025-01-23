const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      title: "Home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/homes", {
      registeredHomes: registeredHomes,
      title: "Homes",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getFavouriteHomes = async (req, res, next) => {
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId).populate("favouriteHomes");
    res.render("store/favourite", {
      homes: user.favouriteHomes,
      title: "Favourites",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

exports.postFavouriteHomes = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user.favouriteHomes.includes(homeId)) {
      user.favouriteHomes.push(homeId);
      await user.save();
    }
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect("/favourite");
  }
};

exports.postDeleteFavouriteHomes = async (req, res, next) => {
  const homeId = req.params.id;
  try {
    const user = await User.findOne({ _id: req.session.user._id });
    user.favouriteHomes.pull(homeId);
    await user.save();
    res.redirect("/favourite");
  } catch (err) {
    console.log(err);
    res.redirect("/favourite");
  }
};

exports.getHomeDetails = (req, res, next) => {
  const hostID = req.params.id;
  Home.findById(hostID).then((homes) => {
    res.render("store/home-details", {
      title: "Home Details",
      home: homes,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};
