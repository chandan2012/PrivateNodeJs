const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");


hostRouter.get("/add-home", hostController.getHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-homes", hostController.getHostHomes);
hostRouter.get("/edit-home/:houseName/:id", hostController.getEditHomes);
hostRouter.post("/edit-home", hostController.postEditHome);
exports.hostRouter = hostRouter;
