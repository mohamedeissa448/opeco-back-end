var express = require("express");
var router = express.Router();
var mainModel = require("../models/main-Model");
/* GET home page. */
router.get("/", function(req, res, next) {
  mainModel.findOne({}, (err, document) => {
    if (err) {
      return res.send({ err: err });
    } else if (document) {
      res.render("index", {
        bannerImage: document.bannerImageUrl,
        aboutUs: document.aboutUs,
        services: document.services,
        projects: document.projects,
        contact: document.contact,
        analytics: document.analytics
      });
    } else {
      res.send({ msg: "404 not found" });
    }
  });
});

module.exports = router;
