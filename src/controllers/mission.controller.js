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
  var body = {
    message: "Réussite de la proposition pour un freelance"
  };
  var returnID = 200;

  //#region check que les valeurs existe
  await Mission.findById(missionID).then((mission) => {
    if(!mission) {
      body = {
        message: "no mission found",
      };
      returnID = 404;
    }
  })
  await User.findById(req.userToken.id).then((business) => {
    if(!business) {
      body = {
        message: "no business found",
      };
      returnID = 404;
    }
  })
  await User.findById(freelanceID).then((freelance) => {
    if(!freelance) {
      body = {
        message: "no freelance found",
      };
      returnID = 404;
    } else {
      if(!freelance.isFreelance) {
        body = {
          message: "Cet utilisateur n'est pas un freelance.",
        };
      }
    }
    
  })
  //TO FIXE
  await Assoc_Freelance_Mission.find({freelanceID: freelanceID, missionID: missionID}).then((assoc) => {
    // console.log(typeof [], typeof assoc)
    console.log(assoc)
    console.log(assoc == [])
    if (assoc != []) {
      console.log("ntm")
      body = {
        message: "Cet utilisateur à déjà accepté cette mission.",
      };
      returnID = 201;
    }
   
  });
  //#endregion

  //#region insert dans les associations les ID
  if(missionID == 200) {
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
  }
  
  //#endregion

  return res.status(returnID).send(body);
};

