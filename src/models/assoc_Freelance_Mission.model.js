const mongoose = require("mongoose");

const assoc_Freelance_MissionSchema = mongoose.Schema(
  {
    freelanceID: [{ type: mongoose.Schema.Types.ObjectId, ref: "freelance" }],
    missionID: [{ type: mongoose.Schema.Types.ObjectId, ref: "mission" }],
    status: [{ type: mongoose.Schema.Types.String}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assoc_Freelance_Mission", assoc_Freelance_MissionSchema);
