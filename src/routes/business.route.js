const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, businessController.create);


module.exports = router;
