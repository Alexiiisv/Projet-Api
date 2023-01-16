const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routes");

require("dotenv").config();
const app = express();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_CLUSTER}`
  )
  .then((_) => console.log("successfully connected to database"))
  .catch((err) => console.log(err));

app.use(bp.json());

app.use("/api/v1", apiRouter);

// var port = 3000;
app.listen(process.env.PORT, function () {
  console.log(`http://localhost:${process.env.PORT}`);
});
