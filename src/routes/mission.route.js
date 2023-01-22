const express = require("express");
const router = express.Router();
const missionController = require("../controllers/mission.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, missionController.create);
router.post("/addhardSkillToMission", verifyToken, missionController.addhardSkillToMission);

// router.post("/register", authController.register);

module.exports = router;
