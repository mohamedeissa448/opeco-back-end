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
  }
});
var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    console.log("file", file);
    if (
      ["jpg", "jpeg", "png", "PNG", "GIF", "JPEG", "pdf"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).fields([
  { name: "image", maxCount: 1 },
  { name: "pdf", maxCount: 1 }
]);
module.exports = {
  update: (req, res) => {
    upload(req, res, function(err) {
      if (err) {
        res.status(422).json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.files) {
        res.status(422).json({ error_code: 1, err_desc: "No files passed" });
        return;
      }

      var query = {},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
      mainModel.findOneAndUpdate(
        query,
        {
          $set: {
            aboutUs: {
              title: req.body.title,
              content: req.body.content,
              imageUrl: req.files["image"][0].filename,
              pdfUrl: req.files["pdf"][0].filename
            }
          }
        },
        options,
        (err, result) => {
          if (err) {
            return res.status(422).send({ msg: "failed" });
          }
          console.log("final result", result);
          res.send({ msg: "success" });
        }
      );
    });
  },
  get: (req, res) => {
    mainModel.findOne({}, (err, document) => {
      if (err) {
        return res.status(500).send({ err: err });
      } else {
        console.log(" document.aboutUs", document.aboutUs);
        res.status(200).send({ aboutUs: document.aboutUs });
      }
    });
  }
};
