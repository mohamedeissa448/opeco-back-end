const express = require("express");
const Router = express.Router();
var homeController = require("../controllers/homeControllers");

Router.post("/updateBannerImage", (req, res, next) => {
  homeController.updateBannerImage(req, res);
});
Router.get("/getBannerImage", (req, res, next) => {
  homeController.getBannerImage(req, res);
});

module.exports = Router;
