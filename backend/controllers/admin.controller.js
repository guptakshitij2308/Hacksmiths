const Admin = require("../models/Admin.model"); // NEW
const User = require("../models/user.model");
const SwapRequest = require("../models/swapRequest.model");
const Rating = require("../models/rating.model");
const AppError = require("../utils/appError");
const { Parser } = require("json2csv");

// Middleware-like validation inside controller (optional strict check)
const ensureAdminPresent = (req, next) => {
  if (!req.admin) return next(new AppError("Unauthorized. Admin access required.", 401));
};

// ✅ 1. Reject skill descriptions
exports.rejectSkill = async (req, res, next) => {
  ensureAdminPresent(req, next);
  try {
    const { email } = req.params;

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          skillsOffered: [],
          skillsWanted: [],
        },
      },
      { new: true }
    );

    if (!user) return next(new AppError("User not found", 404));

    res.status(200).json({
      status: "success",
      message: `Skills cleared for user with email: ${email}`,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ 2. Ban a user
exports.banUser = async (req, res, next) => {
  ensureAdminPresent(req, next);
  try {
    const { email } = req.params;

    const user = await User.findOneAndUpdate(
      { email },
      { isBanned: true },
      { new: true }
    );

    if (!user) return next(new AppError("User not found", 404));

    res.status(200).json({
      status: "success",
      message: `User with email ${email} has been banned.`,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ 3. Unban a user
exports.unbanUser = async (req, res, next) => {
  ensureAdminPresent(req, next);
  try {
    const { email } = req.params;

    const user = await User.findOneAndUpdate(
      { email },
      { isBanned: false },
      { new: true }
    );

    if (!user) return next(new AppError("User not found", 404));

    res.status(200).json({
      status: "success",
      message: `User with email ${email} has been unbanned.`,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ 4. Get swaps by status
exports.getSwapsByStatus = async (req, res, next) => {
  ensureAdminPresent(req, next);
  try {
    const { status } = req.query;

    const filter = status ? { status } : {};

    const swaps = await SwapRequest.find(filter)
      .populate("fromUser", "name email")
      .populate("toUser", "name email");

    res.status(200).json({
      status: "success",
      count: swaps.length,
      data: swaps,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ 5. Broadcast global message
let globalMessage = "";

exports.sendGlobalMessage = async (req, res, next) => {
  ensureAdminPresent(req, next);
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return next(new AppError("Message cannot be empty", 400));
    }

    globalMessage = message;

    res.status(200).json({
      status: "success",
      message: "Platform-wide message broadcasted.",
      data: { message: globalMessage },
    });
  } catch (err) {
    next(err);
  }
};

exports.getGlobalMessage = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: globalMessage,
  });
};

// ✅ 6. Download report
exports.downloadReport = async (req, res, next) => {
  ensureAdminPresent(req, next);
  try {
    const { type } = req.params;

    let data;
    if (type === "users") {
      data = await User.find().select("-password");
    } else if (type === "ratings") {
      data = await Rating.find()
        .populate("fromUser", "email")
        .populate("toUser", "email");
    } else if (type === "swaps") {
      data = await SwapRequest.find()
        .populate("fromUser", "email")
        .populate("toUser", "email");
    } else {
      return next(new AppError("Invalid report type", 400));
    }

    const json2csv = new Parser();
    const csv = json2csv.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`${type}-report.csv`);
    return res.send(csv);
  } catch (err) {
    next(err);
  }
};
