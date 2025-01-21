const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getStores);
storeRouter.get("/favourite", storeController.getFavHomes);
storeRouter.post("/favourite", storeController.postFavHomes);
storeRouter.post("/delete-favourite/:homeId", storeController.postDeleteFavHome);

module.exports = storeRouter;
