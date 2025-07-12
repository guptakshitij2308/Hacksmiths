const SwapRequest = require("../models/SwapRequest.model");
const User = require("../models/User.model");
const AppError = require("../utils/appError");

// 🟢 Create swap request
exports.createSwapRequest = async (req, res, next) => {
  try {
    const {
      offeredSkills,
      requestedSkills,
      message,
      requestingUserEmail,
      requestedUserEmail,
    } = req.body;

    if (
      !offeredSkills?.length ||
      !requestedSkills?.length ||
      !requestingUserEmail ||
      !requestedUserEmail
    ) {
      return next(new AppError("All fields are required", 400));
    }

    const requester = await User.findOne({ email: requestingUserEmail });
    const requestee = await User.findOne({ email: requestedUserEmail });

    if (!requester || !requestee) {
      return next(new AppError("One or both users not found", 404));
    }

    const newSwap = await SwapRequest.create({
      offeredSkills,
      requestedSkills,
      message,
      requestingUserEmail,
      requestedUserEmail,
    });

    res.status(201).json({
      message: "Swap request created successfully",
      swapRequest: newSwap,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Accept swap request
exports.acceptSwapRequest = async (req, res, next) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return next(new AppError("Swap request not found", 404));
    }

    swapRequest.status = "accepted";
    await swapRequest.save();

    res.status(200).json({
      message: "Swap request accepted",
      swapRequest,
    });
  } catch (err) {
    next(err);
  }
};

// ❌ Reject swap request
exports.rejectSwapRequest = async (req, res, next) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return next(new AppError("Swap request not found", 404));
    }

    swapRequest.status = "rejected";
    await swapRequest.save();

    res.status(200).json({
      message: "Swap request rejected",
      swapRequest,
    });
  } catch (err) {
    next(err);
  }
};

// 🔍 Get swap request by ID
exports.getSwapRequestById = async (req, res, next) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return next(new AppError("Swap request not found", 404));
    }

    res.status(200).json(swapRequest);
  } catch (err) {
    next(err);
  }
};
