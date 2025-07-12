const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePhoto: { type: String },
    location: { type: String },

    skillsOffered: {
      type: [String],
      required: [true, "At least one offered skill is required"],
      validate: [(arr) => arr.length > 0, "Offer at least one skill"],
    },

    skillsWanted: {
      type: [String],
      required: [true, "At least one wanted skill is required"],
      validate: [(arr) => arr.length > 0, "Want at least one skill"],
    },

    availability: {
      type: [String],
      required: [true, "Availability is required"],
      validate: [
        (arr) => arr.length > 0,
        "Specify at least one availability slot",
      ],
    },

    isPublic: {
      type: Boolean,
      required: [true, "Please specify if the profile is public or private"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
