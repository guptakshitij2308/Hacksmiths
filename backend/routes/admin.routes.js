const express = require("express");
const router = express.Router();
const {
  rejectSkill,
  banUser,
  unbanUser,
  getSwapsByStatus,
  sendGlobalMessage,
  downloadReport
} = require("../controllers/admin.controller");

const { protect } = require("../middlewares/auth.middleware");
const AdminModel = require("../models/Admin.model");

const restrictToAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        status: "fail",
        message: "Authentication required",
      });
    }

    // Check if this user's email exists in Admin collection
    const admin = await AdminModel.findOne({ email: req.user.email });

    if (!admin) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have admin access",
      });
    }

    // Optional: attach admin record to req
    req.admin = admin;

    next();
  } catch (err) {
    console.error("Admin check error:", err.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error during admin check",
    });
  }
};
// Apply protect and restrictTo inline
router.use(protect, restrictToAdmin);

// 1. Reject skill description
router.patch("/reject-skill/:email", rejectSkill);

// 2. Ban / Unban users
router.patch("/ban-user/:email", banUser);
router.patch("/unban-user/:email", unbanUser);

// 3. Monitor swaps by status
router.get("/swaps", getSwapsByStatus);

// 4. Send platform-wide message
router.post("/message", sendGlobalMessage);

// 5. Download reports (CSV)
router.get("/report/:type", downloadReport);

module.exports = router;
