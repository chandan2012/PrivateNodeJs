const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const routeDir = require("./util/path-util");
const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const errorController = require("./controllers/errorController");
const PORT = 3000;
const {mongoConnect} = require("./util/database-util");



app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(routeDir, "public")));

app.use(hostRouter);
app.use(storeRouter);

app.use(errorController.get404);


mongoConnect(() => {
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  
})

