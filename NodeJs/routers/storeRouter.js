const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/homes/:houseName/:id", storeController.getHomeDetails);
storeRouter.get("/favourite", storeController.getFavouriteHomes);
storeRouter.post("/favourite", storeController.postFavouriteHomes);
module.exports = storeRouter;
