const express = require("express");
const router = express.Router();
const {
  createSwapRequest,
  acceptSwapRequest,
  rejectSwapRequest,
  getSwapRequestById,
  getIncomingSwapRequests,
} = require("../controllers/swapRequest.controller");

const { protect } = require("../middleware/auth.middleware");

router.post("/request", protect, createSwapRequest);
router.get("/incoming", getIncomingSwapRequests);
router.patch("/accept/:id", protect, acceptSwapRequest);
router.patch("/reject/:id", protect, rejectSwapRequest);
router.get("/:id", protect, getSwapRequestById);

// optional protection

module.exports = router;
