const Mission = require("../models/mission.model");
// const Freelance = require("../models/freelance.model");
const User = require("../models/user.model");
const Assoc_Business_Mission = require("../models/assoc_business_mission.model");
const Assoc_Freelance_Mission = require("../models/assoc_Freelance_Mission.model");

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

exports.proposeToFreelance = (req, res) => {
  const { missionID, freelanceID } = req.body;
  Mission.findById(missionID).then((mission) => {
    console.log(mission);
    if(!mission) {
      return res.status(404).send({
        message: "no mission found",
      });
    }
    User.findById(req.userToken.id).then((business) => {
      console.log(business);
      if(!business) {
        return res.status(404).send({
          message: "no business found",
        });
      }
      User.findById(freelanceID).then((freelance) => {
        console.log(freelance);
        if(!freelance) {
          return res.status(404).send({
            message: "no freelance found",
          });
        }
      })
    })
    
    const newAssoc_Business_Mission = Assoc_Business_Mission({
      businessID: req.userToken.id,
      missionID,
      status: 'waiting'
    })
    newAssoc_Business_Mission.save();
    const newAssoc_Freelance_Mission = Assoc_Freelance_Mission({
      freelanceID,
      missionID,
      status: 'waiting'
    })
    newAssoc_Freelance_Mission.save();
    mission.save();
    res.send({
      mission: mission,
    });
  })
};