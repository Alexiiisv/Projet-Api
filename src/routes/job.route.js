const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, jobController.create);

// router.post("/register", authController.register);

module.exports = router;
