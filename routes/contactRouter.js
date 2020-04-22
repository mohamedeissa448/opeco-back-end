const express = require("express");
const Router = express.Router();
var contactController = require("../controllers/contactController");

Router.post("/update", (req, res, next) => {
  contactController.update(req, res);
});
Router.get("/get", (req, res, next) => {
  contactController.get(req, res);
});
module.exports = Router;
