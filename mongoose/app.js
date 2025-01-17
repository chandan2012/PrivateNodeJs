const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const routeDir = require("./util/path-util");
const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const errorController = require("./controllers/errorController");
const { authRouter } = require("./routers/authRouter");

const PORT = 3000;
const MONGODB_URI =
  "mongodb+srv://root:root@airbnb.no48h.mongodb.net/airbnb?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(routeDir, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// app.use((req, res, next) => {
//   req.isLoggedIn = true;
//   next();
// });

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
