const express = require("express");
const router = express.Router();
const missionController = require("../controllers/mission.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyBusiness = require("../middlewares/verifyBusiness");

router.post("/create", [verifyToken, verifyBusiness], missionController.create);
router.post("/addhardSkillToMission", verifyToken, missionController.addhardSkillToMission);
router.post("/addJobToMission", verifyToken, missionController.addJobToMission);

// router.post("/register", authController.register);

module.exports = router;
