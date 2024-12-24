const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");


hostRouter.get("/add-homes", hostController.getHomes);
hostRouter.get("/host-homes", hostController.getHostHomes);
hostRouter.post("/host-homes", hostController.postHome);
hostRouter.get("/edit-home/:houseName/:id", hostController.getEditHome);
hostRouter.post("/edit-home", hostController.postEditHome);

exports.hostRouter = hostRouter;
