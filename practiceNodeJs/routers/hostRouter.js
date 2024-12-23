const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");


hostRouter.get("/add-homes", hostController.getHomes);
hostRouter.get("/host-homes", hostController.getHostHomes);
hostRouter.post("/host-homes", hostController.postHome);

exports.hostRouter = hostRouter;
