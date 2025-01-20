const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getStores);
module.exports = storeRouter;
