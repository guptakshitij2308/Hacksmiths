const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema({
  offeredSkills: {
    type: [String],
    required: true,
  },
  requestedSkills: {
    type: [String],
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
  requestingUserEmail: {
    type: String,
    required: true,
  },
  requestedUserEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SwapRequest", swapRequestSchema);
