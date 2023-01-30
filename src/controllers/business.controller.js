const Business = require("../models/business.model");

exports.create = (req, res) => {
  const { headQuarter, numberSiret, businessStatute, socialReason } =
    req.body;
  const newBusiness = new Business({
    headQuarter,
    numberSiret,
    businessStatute,
    socialReason
  });
  newBusiness
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
