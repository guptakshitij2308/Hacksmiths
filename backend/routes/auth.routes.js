const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/register", upload.single("image"), registerUser); // ✅ handles image too
router.post("/login", loginUser);

module.exports = router;
