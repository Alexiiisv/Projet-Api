const Email = require("../config/mail");
const User = require("../models/user.model");
const Business = require("../models/business.model");
const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const Assoc_Business_Mission = require("../models/assoc_business_mission.model");
const Assoc_Freelance_Mission = require("../models/assoc_Freelance_Mission.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .populate("isBusiness")
    .populate("isFreelance")
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Aucun utilisateur trouvé",
        });
      }
      res.send({
        user: user,
      });
    });
};

exports.getUserInfo = (req, res) => {
  User.findById(req.userToken.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "Aucun utilisateur trouvé",
      });
    }
    res.send({
      user: user,
    });
  });
};

exports.deleteUserById = (req, res) => {
  User.findByIdAndRemove(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "Aucun utilisateur trouvé",
      });
    }
    res.send(user);
  });
};

exports.updateUserById = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  var passwordHash = bcrypt.hashSync(password, saltRounds);

  User.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    email,
    passwordHash,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "Aucun utilisateur trouvé",
      });
    }
    res.send(user);
  });
};

exports.getAllUser = (_, res) => {
  User.find().then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "Aucun utilisateur trouvé",
      });
    } else {
      res.send(user);
    }
  });
};

exports.setFreelance = (req, res) => {
  const { freelanceID, userID } = req.body;
  if (freelanceID == "" || userID == "") {
      return res.status(404).send({
        message:
          "Un champ est manquant",
      });
    }
  User.findByIdAndUpdate(userID, { isFreelance: freelanceID }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    if (user.isBusiness != null || user.isFreelance != null) {
      return res.status(404).send({
        message:
          "L'utilisateur est déjà relié a une entreprise ou bien une freelance, ce n'est pas possible de changer.",
      });
    }
    Freelance.findById(freelanceID).then((freelance) => {
      if (!freelance) {
        return res.status(404).send({
          message: "no freelance found",
        });
      }
    });
    res.send(user);
  });
};

exports.setBusiness = (req, res) => {
  const { businessID, userID } = req.body;
  if (businessID == "" || userID == "") {
      return res.status(404).send({
        message:
          "Un champ est manquant",
      });
    }
  User.findByIdAndUpdate(userID, { isBusiness: businessID }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    if (user.isBusiness != null || user.isFreelance != null) {
      return res.status(404).send({
        message:
          "L'utilisateur est déjà relié a une entreprise ou bien une freelance, ce n'est pas possible de changer.",
      });
    }
    Business.findById(businessID).then((business) => {
      if (!business) {
        return res.status(404).send({
          message: "no freelance found",
        });
      }
    });
    res.send(user);
  });
};

exports.getAllMissionByUserID = (req, res) => {
  Mission.find({freelances: req.body.UserID}).then((mission) => {
    if (!mission) {
      res.send({
        message: "l'utilisateur n'as pas de mission proposé"
      });
    }
    res.send({
      missions: mission
    })
  });
}

exports.getAllPendingMissionByUserID = async (req, res) => {
  await Assoc_Freelance_Mission.find({status: 'Waiting', freelanceID: req.params.id}).then((mission) => {
    if (!mission) {
      res.send({
        message: 'Cet utilisateur n\'as aucune mission en attente.'
      })
    }
    res.send({
      mission
    })
  });
}

exports.acceptMission = async (req, res) => {
  const missionID = req.body.MissionID;
  await Assoc_Freelance_Mission.findOneAndUpdate({missionID: missionID}, {status: "Accepted"}).then(async (assoc) => {
    if (!assoc) {
      return res.status(404).send({
        message: "Aucune mission trouvée"
      });
    }
    if (assoc.status == "Accepted") {
      return res.status(400).send({
        message: "Utilisateur à déjà accepter cette mission."
      });
    }

    
    //#region Mail

    var email;
    await User.findById(assoc.freelanceID).then((user) => {
      email = user.email;
    })
    
    
    //  Assoc_Business_Mission.find({missionID: missionID}).then(async (assocBusiness) => {
    // Dans mes tests, le businessID est a undefined alors que quand je log assocBusiness il a une valeur
    // de ce fait je vais mettre l'email pour les business par celle de l'admin (pas le choix)
    
    // console.log(assocBusiness)
    // console.log(assocBusiness.businessID)
    // await User.findById(assocBusiness.businessID).then((user) => {
    // email = user.email;
    // })
    // })
    let user = email;
    let business = "admin@projapi.com";
    let businessContent = `Cette mission ID: ${missionID} vient d'être acceptée.`;
    let userContent = `Vous venez d'accepter la proposition pour une mission ID: ${missionID}.`;
    let subject = "Acceptation d'une mission";
    console.log("\nEmail Admin");
    await Email(user, business, businessContent, subject);
    console.log("\nEmail User");
    await Email(business, user, userContent, subject);

    //#endregion
    
    return res.send({
      association: assoc,
      mission: mission
    })
  })
  return res.send({
    message: 'L\'utilisateur vient d\'accepter la mission'
  })
}

exports.declineMission = async (req, res) => {
  await Assoc_Freelance_Mission.findOneAndUpdate({missionID: req.body.MissionID}, {status: "Declined"}).then(async (assoc) => {
    if (!assoc) {
      return res.status(404).send({
        message: "aucune mission trouvée"
      });
    }
    if (assoc.status == "Declined") {
      return res.send({
        message: "Utilisateur à déjà refusé cette mission."
      });
    }

    //#region Mail
    // Même problème que pour accepter la mission, je ne peux pas récupérer l'email de l'entreprise.
    // Je met donc l'email de l'Admin à la place.
    
    var email;
    await User.findById(assoc.freelanceID).then((user) => {
      email = user.email;
    })

    let user = email;
    let business = "admin@projapi.com";
    let businessContent = `Cette mission ID: ${req.body.MissionID} vient d'être refusé.`;
    let userContent = `Vous venez de décliner la proposition pour une mission ID: ${req.body.MissionID}.`;
    let subject = "Refus d'une mission";
    console.log("\nEmail Admin");
    await Email(user, business, businessContent, subject);
    console.log("\nEmail User");
    await Email(business, user, userContent, subject);

    //#endregion

    return res.send({
      association: assoc
    })
  })
}

exports.searchFreelance = (req, res) => {
  const {firstName, lastName, city} = req.body;
  User.find({$and: [{$or: [{ firstName }, { lastName }, { city }]}, {isFreelance: { $eq: true}}]}).then((users) => {
    if (!users) {
      return res.status(404).send({
        message: "Aucun utilisateur trouvé"
      });
    }
    res.send(users)
  })
};

exports.changePassword = async (req, res) => {
  var password = bcrypt.hashSync(req.body.password, saltRounds);
  User.findByIdAndUpdate(req.params.id, password).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    bcrypt.compare(req.body.oldpassword, user.password).then((valid) => {
      if (!valid) {
        return res.status(401).send({
          message: "wrong password",
        });
      }
    })
    res.send({
      message: "Le mot de passe vient d'être changé."
    })
  })
};

exports.resetPassword = (req, res) => {
  var newPassword = Math.random().toString(42).substring(1, 14);
  var password = bcrypt.hashSync(newPassword, saltRounds);
  User.findByIdAndUpdate(req.params.id, {password}).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found",
        });
      }
      //#region Email
      let userMail = `"${user.firstName.concat(" ", user.lastName)}" <${user.email}>`;
      let admin = "admin@projapi.com";
      let userContent = `Voici le nouveau mot de passe de votre compte: ${newPassword}`;
      let subject = "Nouveau mot de passe";
      Email(admin, userMail, userContent, subject);
      //#endregion
    })
    res.send({
      message: "Mot de passe modifié."
    })
};