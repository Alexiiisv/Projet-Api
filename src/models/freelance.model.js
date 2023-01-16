const mongoose = require("mongoose");


const freelanceSchema = mongoose.Schema(
  {
    dailyPrice: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    hardSkill: [{ type: mongoose.Schema.Types.ObjectId, ref: "HardSkill" }],
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Freelance", freelanceSchema);
