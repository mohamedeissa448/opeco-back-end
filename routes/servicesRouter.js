const express = require("express");
const Router = express.Router();
var servicesController = require("../controllers/servicesController");
Router.get("/getAllServices", (req, res, next) => {
  servicesController.getAllServices(req, res);
});
Router.post("/addService", (req, res, next) => {
  servicesController.addService(req, res);
});
Router.post("/updateService", (req, res, next) => {
  servicesController.updateService(req, res);
});
module.exports = Router;
