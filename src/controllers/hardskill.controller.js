const HardSkill = require("../models/hardSkill.model");

exports.create = (req, res) => {
  const { name } =
    req.body;
  const newHardSkill = new HardSkill({
    name
  });
  newHardSkill
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
