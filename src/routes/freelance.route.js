const express = require("express");
const router = express.Router();
const freelanceController = require("../controllers/freelance.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, freelanceController.create);
router.get("/getAllFreelance", verifyToken, freelanceController.getAllFreelance);


module.exports = router;
