const Mission = require("../models/mission.model");

exports.create = (req, res) => {
  const startDate = Date.now(); //quand j'arriverai a faire la date sur postman je le changerai :)
  const endDate = Date.now(); //quand j'arriverai a faire la date sur postman je le changerai :)
  const { totalPrice, description, title } =
    req.body;
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