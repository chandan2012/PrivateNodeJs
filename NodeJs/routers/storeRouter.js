const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getStore);
module.exports = storeRouter;