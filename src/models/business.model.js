const mongoose = require("mongoose");

const businessSchema = mongoose.Schema(
  {
    socialReason: {
      type: String,
      required: true,
      lowercase: true,
    },
    businessStatute: {
      type: String,
      required: true,
      lowercase: true,
    },
    numberSiret: {
      type: Number,
      required: true,
      maxLength: 9,
      minLength: 9,
    },
    headQuarter: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Business", businessSchema);
