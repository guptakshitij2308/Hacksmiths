const User = require("../models/User.model");
const AppError = require("../utils/appError");

// // ✅ Get My Profile
// exports.getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.params.email }).select("-password");

//     if (!user) {
//       return next(new AppError("User not found", 404));
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

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
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );

    if (!user) return next(new AppError("User not found", 404));

    if (!user.isPublic && req.user.email !== user.email) {
      return next(new AppError("This profile is private", 403));
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// ✅ Get All Public Users (Paginated)
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({ isPublic: true })
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({ isPublic: true });

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Search Users by Skill
// ✅ Search Users by Skill and Availability (Paginated)
exports.searchUsers = async (req, res, next) => {
  try {
    let { skills, availability, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const query = {
      isPublic: true,
    };

    if (skills) {
      if (typeof skills === "string") {
        skills = skills.split(",").map((s) => s.trim());
      }
      query.$or = [
        { skillsOffered: { $in: skills } },
        { skillsWanted: { $in: skills } },
      ];
    }

    if (availability) {
      if (typeof availability === "string") {
        availability = availability.split(",").map((a) => a.trim());
      }
      query.availability = { $in: availability };
    }

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (err) {
    next(err);
  }
};
