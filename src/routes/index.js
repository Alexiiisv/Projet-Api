const express = require("express");
const router = express.Router();

const jobRouter = require("./job.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const missionRouter = require("./mission.route");
const businessRouter = require("./business.route");
const freelanceRouter = require("./freelance.route");
const hardSkillRouter = require("./hardSkill.route");

router.use("/job", jobRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/mission", missionRouter);
router.use("/business", businessRouter);
router.use("/freelance", freelanceRouter);
router.use("/hardSkill", hardSkillRouter);

module.exports = router;
