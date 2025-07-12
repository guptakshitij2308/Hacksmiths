const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
  updateProfile,
  getUserByEmail,
  searchUsers,
  getAllUsers,
} = require("../controllers/user.controller");

router.get("/all", getAllUsers);

// 📌 PUBLIC ROUTES
router.get("/search", searchUsers); // GET /api/users/search?skill=React

router.get("/:email", protect, getUserByEmail);

// 🔐 Update my profile
router.patch("/update", protect, updateProfile); // PUT /api/users/me

// router.get("/:id", getUserByEmail);     // GET /api/users/:id

module.exports = router;
