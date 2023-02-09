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

exports.delete = (req, res) => {
  Mission.findByIdAndDelete(req.params.id).then(async (mission) => {
    if(!mission) {
      return res.status(400).send({
        message: "Cette mission n'existe pas."
      })
    }
    await Assoc_Business_Mission.find({businessID: req.userToken.id, missionID: mission}).then((assoc) => {
      if (assoc.length <= 0) {
        return res.status(201).send({
          message: "Cet utilisateur n'est pas le créateur de la mission, il ne peut pas la supprimer.",
        });
      }
    });
    Assoc_Freelance_Mission.find({missionID: mission}).remove();
    res.send(mission);
  });
};

exports.update = (req, res) => {
  Mission.findByIdAndUpdate(req.params.id, {totalPrice: req.body.totalPrice, description: req.body.description, title: req.body.title, startDate: req.body.startDate, endDate: req.body.endDate}).then(async (mission) => {
    if (!mission) {
      res.status(400).send({
        message: "Cette mission n'existe pas."
      })
    }
    await Assoc_Business_Mission.find({businessID: req.userToken.id, missionID: mission}).then((assoc) => {
      if (assoc.length <= 0) {
        return res.status(201).send({
          message: "Cet utilisateur n'est pas le créateur de la mission, il ne peut pas la supprimer.",
        });
      }
    });
    res.send(mission);
  })
}

exports.addhardSkillToMission = (req, res) => {
  const { missionID, hardSkillID } = req.body;
  Mission.findById(missionID).then((mission) => {
    if (!mission) {
      return res.status(404).send({
        message: "Aucune mission trouvée",
      });
    }
    if (!mission.hardSkill.includes(hardSkillID)) {
      mission.hardSkill.push(hardSkillID);
    } else {
      return res.status(409).send({
        message: "Cette comprétence est déjà reliée à cette mission",
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
        message: "Aucune mission trouvée",
      });
    }
    if (!mission.job.includes(jobID)) {
      mission.job.push(jobID);
    } else {
      return res.status(409).send({
        message: "Ce métier est déjà relié à cette mission",
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
        message: "Aucune mission trouvée",
      });
    }
  })
  await User.findById(req.userToken.id).then((business) => {
    if(!business) {
      return res.status(404).send({
        message: "Aucune entreprise trouvée",
      });
    }
  })
  await User.findById(freelanceID).then((freelance) => {
    if(!freelance) {
      return res.status(404).send({
        message: "Aucun freelance trouvé",
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

