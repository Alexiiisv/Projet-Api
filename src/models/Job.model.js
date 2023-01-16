const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
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

module.exports = mongoose.model("Job", jobSchema);
