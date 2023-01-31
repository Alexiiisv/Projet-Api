const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/getUserById/:id", verifyToken, userController.getUserById);

router.get("/getUserInfo", verifyToken, userController.getUserInfo);

router.get("/deleteUserById/:id", verifyToken, userController.deleteUserById);

router.put("/updateUserById/:id", verifyToken, userController.updateUserById);

router.get("/getAllUser", verifyToken, userController.getAllUser);

router.post("/setFreelance", verifyToken, userController.setFreelance);

router.post("/setBusiness", verifyToken, userController.setBusiness);

module.exports = router;
