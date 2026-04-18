const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    subBreeds: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dog", dogSchema);