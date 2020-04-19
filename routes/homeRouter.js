const express = require("express");
const Router = express.Router();
var homeController = require("../controllers/homeControllers");

Router.post("/updateBannerImage", (req, res, next) => {
  homeController.updateBannerImage(req, res);
});

module.exports = Router;
