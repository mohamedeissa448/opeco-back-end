var express = require("express");
var router = express.Router();
var passport = require("passport");
var usersController = require("../controllers/usersControllers");

/* GET users listing. */
router.post("/login", passport.authenticate("local"), function(req, res, next) {
  console.log("req.user", req.user);
  //this function will be executed only if loging in succeded
  //it will add a property req.user
  usersController.login(req, res);
});
router.post("/signUp", function(req, res, next) {
  usersController.signUp(req, res);
});

module.exports = router;
