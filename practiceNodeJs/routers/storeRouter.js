const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getHomes);
storeRouter.get("/favourite", storeController.getFavouriteHomes);
storeRouter.get("/:houseName/:id", storeController.getHomeDetails);
storeRouter.post("/favourite", storeController.postFavouriteHomes);
module.exports = storeRouter;
