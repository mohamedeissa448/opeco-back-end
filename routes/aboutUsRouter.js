const express = require("express");
const Router = express.Router();
var aboutUsController = require("../controllers/aboutUsController");

Router.post("/update", (req, res, next) => {
  aboutUsController.update(req, res);
});
Router.get("/get", (req, res, next) => {
  aboutUsController.get(req, res);
});
module.exports = Router;
