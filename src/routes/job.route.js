const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/delete/:id", verifyToken, jobController.delete);
router.get("/getAll", verifyToken, jobController.getAll);
router.post("/create", verifyToken, jobController.create);
router.put("/update/:id", verifyToken, jobController.update);

module.exports = router;
