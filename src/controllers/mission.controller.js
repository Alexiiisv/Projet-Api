const Mission = require("../models/mission.model");

exports.create = (req, res) => {
  const { startDate, endDate, totalPrice, description, title, job, hardSkill } =
    req.body;
  const newMission = new Mission({
    startDate,
    endDate,
    totalPrice,
    description,
    title,
    job,
    hardSkill,
  });
  newMission
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
