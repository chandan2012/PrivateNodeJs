const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/homes/:houseName/:id", storeController.getHomeDetails);
storeRouter.get("/favorite-homes", storeController.getFavourites);
storeRouter.post("/favorite-homes", storeController.postAddFavourites);
module.exports = storeRouter;
