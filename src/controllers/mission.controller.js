const Mission = require("../models/mission.model");
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

exports.proposeToFreelance = async (req, res) => {
  const { missionID, freelanceID } = req.body;

  //#region check que les valeurs existe
  await Mission.findById(missionID).then((mission) => {
    if(!mission) {
      return res.status(404).send({
        message: "no mission found",
      });
    }
  })
  await User.findById(req.userToken.id).then((business) => {
    if(!business) {
      return res.status(404).send({
        message: "no business found",
      });
    }
  })
  await User.findById(freelanceID).then((freelance) => {
    if(!freelance) {
      return res.status(404).send({
        message: "no freelance found",
      });
    } else {
      if(!freelance.isFreelance) {
        return res.status(201).send({
          message: "Cet utilisateur n'est pas un freelance.",
        });
      }
    }
    
  })
  await Assoc_Freelance_Mission.find({missionID: missionID, status: "Accepted"}).then((assoc) => {
    if (assoc.length == 3) {
      return res.status(201).send({
        message: "Cet mission à déjà 3 freelances acceptés.",
      });
    }
   
  });
  await Assoc_Freelance_Mission.find({freelanceID: freelanceID, missionID: missionID}).then((assoc) => {
    if (assoc.length > 0) {
      return res.status(201).send({
        message: "Cet utilisateur à déjà été proposé pour cette mission.",
      });
    }
   
  });
  //#endregion

  //#region insert dans les associations les ID
  const newAssoc_Business_Mission = Assoc_Business_Mission({
    businessID: req.userToken.id,
    missionID
  })
  const newAssoc_Freelance_Mission = Assoc_Freelance_Mission({
    freelanceID,
    missionID,
    status: 'Waiting'
  })
  newAssoc_Business_Mission.save();
  newAssoc_Freelance_Mission.save();

  //#endregion

  return res.status(200).send({
    message: "Réussite de la proposition pour un freelance"
  });
};

