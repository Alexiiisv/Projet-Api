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

exports.delete = (req, res) => {
  HardSkill.findByIdAndDelete(req.params.id).then((hardSkill) => {
    if(!hardSkill) {
      res.status(400).send({
        message: "Cette compétence n'existe pas."
      })
    }
    res.send(hardSkill);
  });
};

exports.getAll = (_, res) => {
  HardSkill.find().then((hardSkill) => {
    if(!hardSkill) {
      res.status(400).send({
        message: "Aucune compétence existe."
      })
    }
    res.send(hardSkill);
  });
};

exports.update = (req, res) => {
  HardSkill.findByIdAndUpdate(req.params.id, {name: req.body.name}).then((hardSkill) => {
    if (!hardSkill) {
      res.status(400).send({
        message: "Cette compétence n'existe pas."
      })
    }
    res.send(hardSkill);
  })
}