const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { checkEmail, checkIdentity,  checkPassword, validation } = require('../middlewares/validator');

router.post("/login", checkEmail, checkPassword, validation, authController.login);
router.post("/register", checkEmail, checkIdentity, checkPassword, validation, authController.register);

module.exports = router;
