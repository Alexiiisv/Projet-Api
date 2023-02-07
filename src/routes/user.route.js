const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyFreelanceMission = require("../middlewares/verifyFreelanceMission");

router.get("/getUserById/:id", verifyToken, userController.getUserById);

router.get("/getUserInfo", verifyToken, userController.getUserInfo);

router.get("/deleteUserById/:id", verifyToken, userController.deleteUserById);

router.put("/updateUserById/:id", verifyToken, userController.updateUserById);

router.get("/getAllUser", verifyToken, userController.getAllUser);

router.post("/setFreelance", verifyToken, userController.setFreelance);

router.post("/setBusiness", verifyToken, userController.setBusiness);

router.get("/getAllMissionByUserID", verifyToken, userController.getAllMissionByUserID);

router.get("/getAllPendingMissionByUserID", verifyToken, userController.getAllPendingMissionByUserID);

router.post("/acceptMission", [verifyToken, verifyFreelanceMission], userController.acceptMission);

module.exports = router;
