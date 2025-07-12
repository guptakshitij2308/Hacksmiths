const User = require("../models/User.model");
const AppError = require("../utils/appError");

// ✅ Get My Profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


// ✅ Update My Profile
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "location",
      "profilePhoto",
      "skillsOffered",
      "skillsWanted",
      "availability",
      "isPublic",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// ✅ Get Another User by ID
exports.getUserByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");

    if (!user) return next(new AppError("User not found", 404));

    if (!user.isPublic && req.user.email !== user.email) {
      return next(new AppError("This profile is private", 403));
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


// ✅ Search Users by Skill
exports.searchUsersBySkill = async (req, res, next) => {
  try {
    let { skills } = req.query;

    if (!skills) {
      return next(new AppError("Skills query is required", 400));
    }

    // Convert skills to array (in case it's a comma-separated string)
    if (typeof skills === "string") {
      skills = skills.split(",").map(s => s.trim());
    }

    const users = await User.find({
      isPublic: true,
      $and: [
        {
          $or: [
            { skillsOffered: { $all: skills } },
            { skillsWanted: { $all: skills } }
          ]
        }
      ]
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
