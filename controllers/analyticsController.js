var mainModel = require("../models/main-Model");

module.exports = {
  update: (req, res) => {
    console.log("boooooodyxx", req.body);
    mainModel
      .findOne({})
      .then(document => {
        if (!document) return res.status(404).send({ msg: "not found" });

        var query = {},
          options = { new: true, setDefaultsOnInsert: true };
        mainModel.findOneAndUpdate(
          query,
          {
            $set: {
              analytics: req.body.analytics
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
    // });
  },
  get: (req, res) => {
    mainModel.findOne({}, (err, document) => {
      if (err) {
        return res.status(500).send({ err: err });
      }
      return res.send({ analytics: document.analytics });
    });
  }
};
