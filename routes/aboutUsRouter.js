const express = require("express");
const Router = express.Router();
var aboutUsController = require("../controllers/aboutUsController");
Router.post("/updateImgAndPdf", (req, res, next) => {
  aboutUsController.updateImgAndPdf(req, res);
});

Router.post("/updateBody", (req, res, next) => {
  aboutUsController.updateBody(req, res);
});
Router.post("/update", (req, res, next) => {
  aboutUsController.update(req, res);
});
module.exports = Router;
