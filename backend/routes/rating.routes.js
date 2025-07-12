const express = require("express");
const router = express.Router();
const {
  createRating,
  getRatingsForUser,
  getMyGivenRatings
} = require("../controllers/rating.controller");

const { protect } = require("../middleware/auth.middleware");

// 🟢 Create a rating (requires authentication)
router.post("/", createRating);

// 🔵 Get all ratings for a user by userId
router.get("/user/:userId", getRatingsForUser);

// 🔵 Get all ratings given by the logged-in user
router.get("/me", protect, getMyGivenRatings);

module.exports = router;
