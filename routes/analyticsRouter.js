const express = require("express");
const Router = express.Router();
var analyticsController = require("../controllers/analyticsController");

Router.post("/update", (req, res, next) => {
  analyticsController.update(req, res);
});
Router.get("/get", (req, res, next) => {
  analyticsController.get(req, res);
});
module.exports = Router;
