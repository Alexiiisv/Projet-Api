const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const missionRouter = require("./mission.route");
// const productRouter = require("./product.route");

router.use("/auth", authRouter);
router.use("/mission", missionRouter);
// router.use("/product", productRouter);

module.exports = router;
