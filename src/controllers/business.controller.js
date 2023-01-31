const Business = require("../models/business.model");

exports.create = (req, res) => {
  const { headQuarter, numberSiret, businessStatute, socialReason } = req.body;
  const newBusiness = new Business({
    headQuarter,
    numberSiret,
    businessStatute,
    socialReason,
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

exports.getAllBusiness = (_, res) => {
  Business.find().then((business) => {
    if (!business) {
      return res.status(404).send({
        message: "no business found",
      });
    } else {
      res.send(business);
    }
  });
};

