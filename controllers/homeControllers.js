var multer = require("multer");
var mainModel = require("../models/main-Model");

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + "-" + datetimestamp + "." + file.originalname);
    console.log("fieldname", file.fieldname);
  }
});
var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    console.log("original name", file.originalname);
    if (
      ["jpg", "jpeg", "png", "PNG", "GIF", "JPEG"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).single("file");
module.exports = {
  updateBannerImage: (req, res) => {
    upload(req, res, function(err) {
      if (err) {
        res.status(422).json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: "No file passed" });
        return;
      }
      console.log(req.file);
      var query = {},
        update = { bannerImageUrl: req.file.filename },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

      // Find the document
      mainModel.findOneAndUpdate(query, update, options, function(err, result) {
        if (err) {
          return res.status(500).send({ err: err });
        }
        res.send({ msg: "success" });
      });
    });
  },

  getBannerImage: (req, res) => {
    mainModel.findOne({}, (err, document) => {
      if (err) {
        return res.status(500).send({ err: err });
      } else {
        console.log(" document.bannerImageUrl", document.bannerImageUrl);
        res.status(200).send({ bannerImageUrl: document.bannerImageUrl });
      }
    });
  }
};
