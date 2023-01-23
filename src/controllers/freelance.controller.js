const Freelance = require("../models/freelance.model");

exports.create = (req, res) => {
  const { experience, dailyPrice } = req.body;
  const newFreelance = new Freelance({
    experience,
    dailyPrice
  });
  newFreelance
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
