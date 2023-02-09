const mongoose = require("mongoose");

const assoc_Business_MissionSchema = mongoose.Schema(
  {
    businessID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    missionID: { type: mongoose.Schema.Types.ObjectId, ref: "mission" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("assoc_Business_Mission", assoc_Business_MissionSchema);
