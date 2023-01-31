const Mission = require("../models/mission.model");

exports.create = (req, res) => {
  const { totalPrice, description, title, startDate, endDate } =
    req.body;
    console.log(endDate);
  const newMission = new Mission({
    startDate,
    endDate,
    totalPrice,
    description,
    title,
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

exports.addhardSkillToMission = (req, res) => {
  const { missionID, hardSkillID } = req.body;
  Mission.findById(missionID).then((mission) => {
    if (!mission) {
      return res.status(404).send({
        message: "no mission found",
      });
    }
    if (!mission.hardSkill.includes(hardSkillID)) {
      mission.hardSkill.push(hardSkillID);
    } else {
      return res.status(409).send({
        message: "This hardSkill already exist for this mission",
      });
    }
    mission.save();
    res.send({
      mission: mission,
    });
  });
};

exports.addJobToMission = (req, res) => {
  const { missionID, jobID } = req.body;
  Mission.findById(missionID).then((mission) => {
    if (!mission) {
      return res.status(404).send({
        message: "no mission found",
      });
    }
    if (!mission.job.includes(jobID)) {
      mission.job.push(jobID);
    } else {
      return res.status(409).send({
        message: "This hardSkill already exist for this mission",
      });
    }
    mission.save();
    res.send({
      mission: mission,
    });
  });
};