const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const missionRouter = require("./mission.route");
const hardSkillRouter = require("./hardSkill.route");

router.use("/auth", authRouter);
router.use("/mission", missionRouter);
router.use("/hardSkill", hardSkillRouter);

module.exports = router;
