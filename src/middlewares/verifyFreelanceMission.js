const FreelanceMissionWaiting = require('../models/assoc_Freelance_Mission.model');

async function verifyFreelanceMission(req, res, next) {
  await FreelanceMissionWaiting.find({status: 'waiting', freelanceID: req.userToken.id}).then((mission) => {
    if (mission.length <= 0) {
    return res.status(403).send("Aucune proposition de mission existe pour cet utilisateur");
  }
  });
  
  next();
}

module.exports = verifyFreelanceMission;
