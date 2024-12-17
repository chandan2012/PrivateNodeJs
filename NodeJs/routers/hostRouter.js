const express = require("express");
const path = require("path");
const routeDir = require("../util/path-util")
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
    res.sendFile(path.join(routeDir, 'views', "add-home.html"))
});

hostRouter.post("/add-home", (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(routeDir, 'views', "home-added.html"))
});

module.exports = hostRouter;