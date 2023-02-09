const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyFreelanceMission = require("../middlewares/verifyFreelanceMission");

router.get("/getUserById/:id", verifyToken, userController.getUserById);
router.get("/getUserInfo", verifyToken, userController.getUserInfo);
router.get("/deleteUserById/:id", verifyToken, userController.deleteUserById);
router.get("/getAllUser", verifyToken, userController.getAllUser);
router.get("/getAllMissionByUserID", verifyToken, userController.getAllMissionByUserID);
router.get("/getAllPendingMissionByUserID/:id", verifyToken, userController.getAllPendingMissionByUserID);
router.get("/searchFreelance", verifyToken, userController.searchFreelance);
router.post("/setFreelance", verifyToken, userController.setFreelance);
router.post("/setBusiness", verifyToken, userController.setBusiness);
router.post("/acceptMission", verifyToken, userController.acceptMission);
router.post("/declineMission", verifyToken, userController.declineMission);
router.put("/updateUserById/:id", verifyToken, userController.updateUserById);
router.put("/resetPassword/:id", userController.resetPassword);
router.put("/changePassword", verifyToken, userController.changePassword);

module.exports = router;
