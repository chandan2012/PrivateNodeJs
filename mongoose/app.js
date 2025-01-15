const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const routeDir = require("./util/path-util");
const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const errorController = require("./controllers/errorController");
const PORT = 3000;
// const { mongoConnect } = require("./util/database-util");
const mongoose = require("mongoose");

// const MONGODB_URI = 'mongodb+srv://root:root@airbnb.no48h.mongodb.net/?retryWrites=true&w=majority&appName=airbnb';
const MONGODB_URI =
  "mongodb+srv://root:root@airbnb.no48h.mongodb.net/airbnb?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(routeDir, "public")));

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
