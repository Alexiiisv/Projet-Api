const express = require("express");
const router = express.Router();
const hardSkillController = require("../controllers/hardskill.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/delete/:id", verifyToken, hardSkillController.delete);
router.get("/getAll", verifyToken, hardSkillController.getAll);
router.post("/create", verifyToken, hardSkillController.create);
router.put("/update/:id", verifyToken, hardSkillController.update);

module.exports = router;
