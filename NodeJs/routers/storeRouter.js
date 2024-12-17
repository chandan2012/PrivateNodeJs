const express = require("express");
const path = require("path");
const routeDir = require("../util/path-util")
const storeRouter = express.Router();


storeRouter.get("/", (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', "index.html"))
});
module.exports = storeRouter;