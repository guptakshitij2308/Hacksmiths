const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  getUserByEmail,
  searchUsersBySkill,
} = require("../controllers/user.controller");

// 📌 PUBLIC ROUTES
router.get("/search", searchUsersBySkill);    // GET /api/users/search?skill=React

// 📌 PROTECTED ROUTES
router.get("/:email", getProfile);     // GET /api/users/me
router.put("/:email", updateProfile);  // PUT /api/users/me
router.get("/:id", getUserByEmail);     // GET /api/users/:id

module.exports = router;
