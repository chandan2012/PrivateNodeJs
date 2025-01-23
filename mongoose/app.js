const ENV = process.env.NODE_ENV || 'production'
require('dotenv').config({
  path: `.env.${ENV}`
});
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer  = require('multer')
const bodyParser = require("body-parser");
const path = require("path");


const routeDir = require("./util/path-util");
const storeRouter = require("./routers/storeRouter");
const errorController = require("./controllers/errorController");
const { authRouter } = require("./routers/authRouter");
const { hostRouter } = require("./routers/hostRouter");

const app = express();
const MONGODB_URI =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@airbnb.no48h.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const sanitizedFileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
    cb(null, sanitizedFileName);
  },
});
const fileFilter = (req, file, cb) => {  
  const isValidFile = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype);
  cb(null, isValidFile);
}


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(routeDir, "public")));
app.use('/uploads', express.static(path.join(routeDir, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({storage, fileFilter}).single('photo'));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use(hostRouter);
app.use(storeRouter);
app.use(errorController.get404);


const PORT = process.env.PORT  || 3000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err);
  });
