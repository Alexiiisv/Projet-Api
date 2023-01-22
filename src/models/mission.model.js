const mongoose = require("mongoose");

const missionSchema = mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    job: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    hardSkill: [{ type: mongoose.Schema.Types.ObjectId, ref: "HardSkill" }],
    status: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mission", missionSchema);
