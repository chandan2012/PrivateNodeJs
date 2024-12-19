const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");


hostRouter.get("/add-home", hostController.getHome);

hostRouter.post("/add-home", hostController.postAddHome);

exports.hostRouter = hostRouter;
