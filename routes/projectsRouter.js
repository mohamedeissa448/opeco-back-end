const express = require("express");
const Router = express.Router();
var projectsController = require("../controllers/projectsController");
Router.get("/getAllProjects", (req, res, next) => {
  projectsController.getAllProjects(req, res);
});
Router.post("/addProject", (req, res, next) => {
  projectsController.addProject(req, res);
});
Router.post("/updateProject", (req, res, next) => {
  projectsController.updateProject(req, res);
});
module.exports = Router;
