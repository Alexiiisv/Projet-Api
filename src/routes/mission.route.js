const express = require("express");
const router = express.Router();
const missionController = require("../controllers/mission.controller");

router.post("/create", missionController.create);

// router.post("/register", authController.register);

module.exports = router;
