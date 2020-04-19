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
    if (
      ["jpg", "jpeg", "png", "PNG", "GIF", "JPEG"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  }
}).single("image");
module.exports = {
  getAllProjects: (req, res) => {
    mainModel
      .findOne()
      .exec()
      .then(document => {
        if (!document) {
          return res.status(404).send({ msg: "not found" });
        }
        res.send({ projects: document.projects });
      })
      .catch(err => {
        next(err);
      });
  },
  addProject: (req, res) => {
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
      let imageUrl = req.file.filename;
      // Find the document
      console.log("imageUrl", imageUrl);
      mainModel
        .findOne({})
        .then(document => {
          if (!document) return res.status(404).send({ msg: "not found" });
          console.log("projects", document.projects);
          //we need to create our object
          document.projects.push({
            imageUrl: imageUrl,
            title: req.body.title,
            caption: req.body.caption
          });
          console.log("projects", document.projects);

          var query = {},
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
          mainModel.findOneAndUpdate(
            query,
            {
              $set: {
                projects: document.projects
              }
            },
            options,
            (err, result) => {
              if (err) {
                return res.status(422).send({ msg: "failed" });
              }
              console.log("result", result);
              res.send({ msg: "success" });
            }
          );
        })

        .catch(err => res.status(500).send({ err: err }));
    });
  },
  updateProject: (req, res) => {
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
      let imageUrl = req.file.filename;
      // Find the document
      console.log("imageUrl", imageUrl);
      mainModel
        .findOne({})
        .then(document => {
          if (!document) return res.status(404).send({ msg: "not found" });
          console.log("projects,before update", document.projects);
          //we need to update our object
          document.projects.forEach(element => {
            if (element._id == req.body._id) {
              element.imageUrl = imageUrl;
              (element.title = req.body.title),
                (element.caption = req.body.caption);
            }
          });
          console.log("projects,after update", document.projects);
          var query = {},
            options = { new: true, setDefaultsOnInsert: true };
          mainModel.findOneAndUpdate(
            query,
            {
              $set: {
                projects: document.projects
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
