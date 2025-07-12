const Rating = require("../models/Rating.model");
const User = require("../models/User.model");
const AppError = require("../utils/appError");

// ✅ Create a rating from current user to another user (by userId or email)
exports.createRating = async (req, res, next) => {
  try {
    const { toUserEmail, fromUserEmail, rating, comment } = req.body;

    // Validate rating value
    if (!rating || rating < 1 || rating > 5) {
      return next(new AppError("Rating must be between 1 and 5", 400));
    }

    if (!toUserEmail || !fromUserEmail) {
      return next(new AppError("Both fromUserEmail and toUserEmail are required.", 400));
    }

    if (toUserEmail === fromUserEmail) {
      return next(new AppError("You cannot rate yourself.", 400));
    }

    // Fetch users from email
    const fromUser = await User.findOne({ email: fromUserEmail });
    const toUser = await User.findOne({ email: toUserEmail });

    if (!fromUser || !toUser) {
      return next(new AppError("Either sender or recipient user not found.", 404));
    }
	
    const newRating = await Rating.create({
      fromUser: fromUser._id,
      toUser: toUser._id,
      rating,
      comment,
    });

    res.status(201).json({
      status: "success",
      data: newRating,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get all ratings received by a user (by ID or email)
exports.getRatingsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user =
      userId.includes("@")
        ? await User.findOne({ email: userId })
        : await User.findById(userId);

    if (!user) return next(new AppError("User not found", 404));

    const ratings = await Rating.find({ toUser: user._id })
      .populate("fromUser", "name email")
      .sort({ createdAt: -1 });

    const average =
      ratings.length > 0
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : null;

    res.status(200).json({
      status: "success",
      count: ratings.length,
      averageRating: average,
      data: ratings,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get all ratings given by the logged-in user
exports.getMyGivenRatings = async (req, res, next) => {
  try {
    const myRatings = await Rating.find({ fromUser: req.user.id })
      .populate("toUser", "name email");

    res.status(200).json({
      status: "success",
      count: myRatings.length,
      data: myRatings,
    });
  } catch (err) {
    next(err);
  }
};
