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
    /* if (
      ["jpg", "jpeg", "png", "PNG", "GIF", "JPEG"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }*/
    callback(null, true);
  }
}).single("image");
module.exports = {
  getAllServices: (req, res) => {
    mainModel
      .findOne()
      .exec()
      .then(document => {
        if (!document) {
          return res.status(404).send({ msg: "not found" });
        }
        res.send({ services: document.services });
      })
      .catch(err => {
        next(err);
      });
  },
  addService: (req, res) => {
    console.log("addImgggggggggggggggggggggggggggggggg");
    console.log("req.file", req.file);
    upload(req, res, function(err) {
      console.log("boooooodyxx", req.body);
      if (err) {
        res.status(422).json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: "No file passed" });
        return;
      }
      var query = {},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
      let imageUrl = req.file.filename;
      // Find the document
      console.log("imageUrl", imageUrl);
      const isDone = false;
      mainModel
        .findOne({})
        .then(document => {
          if (!document) return res.status(404).send({ msg: "not found" });
          console.log("services", document.services);
          //we need to create our object
          document.services.push({
            imageUrl: imageUrl,
            title: req.body.title,
            content: req.body.content
          });
          console.log("services", document.services);

          var query = {},
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
          mainModel.findOneAndUpdate(
            query,
            {
              $set: {
                services: document.services
              }
            },
            options,
            (err, result) => {
              if (err) {
                return res.status(422).send({ msg: "failed" });
              }
              console.log("img result", result);
              res.send({ msg: "success" });
            }
          );
        })

        .catch(err => res.status(500).send({ err: err }));
    });
  },
  updateService: (req, res) => {
    upload(req, res, function(err) {
      console.log("boooooodyxx", req.body);
      if (err) {
        res.status(422).json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: "No file passed" });
        return;
      }
      var query = {},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
      let imageUrl = req.file.filename;
      // Find the document
      console.log("imageUrl", imageUrl);
      const isDone = false;
      mainModel
        .findOne({})
        .then(document => {
          if (!document) return res.status(404).send({ msg: "not found" });
          console.log("services,before update", document.services);
          //we need to update our object
          document.services.forEach(element => {
            if (element._id == req.body._id) {
              element.imageUrl = imageUrl;
              (element.title = req.body.title),
                (element.content = req.body.content);
            }
          });
          console.log("services,after update", document.services);
          var query = {},
            options = { new: true, setDefaultsOnInsert: true };
          mainModel.findOneAndUpdate(
            query,
            {
              $set: {
                services: document.services
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
        })

        .catch(err => res.status(500).send({ err: err }));
    });
  }
};
