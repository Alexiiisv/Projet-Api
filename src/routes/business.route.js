const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, businessController.create);
router.get("/getAllBusiness", verifyToken, businessController.getAllBusiness);


module.exports = router;
