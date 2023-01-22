const express = require("express");
const router = express.Router();
const hardSkillController = require("../controllers/hardskill.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, hardSkillController.create);

// router.post("/register", authController.register);

module.exports = router;
