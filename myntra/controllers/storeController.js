const Home = require("../models/home");
const User = require("../models/user");

exports.getStores = async (req, res) => {
  const homes = await Home.find();
  res.render("store/index", { title: "Home page", isLoggedIn: req.session.isLoggedIn, Homes: homes,
    user: req.session.user, });
};

exports.getFavHomes = async (req, res) => {
  const userId = req.session.user._id;
  try{
    const user = await User.findById(userId).populate("favouriteHomes")
    res.render("store/favourite",{
      Homes: user.favouriteHomes,
      title: "Favourite Homes",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  }
  catch(err){
    console.log(err);
  }
}

exports.postFavHomes = async (req, res) => {
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
}

exports.postDeleteFavHome = async (req, res) => {
  const homeId = req.params.homeId;
   try {
      const user = await User.findOne({ _id: req.session.user._id });
      user.favouriteHomes.pull(homeId);
      await user.save();
      res.redirect("/favourite");
    } catch (err) {
      console.log(err);
      res.redirect("/favourite");
    }     
    
}