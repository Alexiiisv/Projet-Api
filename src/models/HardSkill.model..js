const mongoose = require("mongoose");


const hardSkillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HardSkill", hardSkillSchema);
