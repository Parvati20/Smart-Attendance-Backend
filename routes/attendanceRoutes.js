// import express from "express";
// import { markQRAttendance } from "../controllers/attendanceController.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/mark", verifyToken, markQRAttendance);

// export default router;

// routes/attendanceRoutes.js
import express from "express";
import { markQRAttendance } from "../controllers/attendanceController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Correct route
router.post("/mark", verifyToken, markQRAttendance);

export default router;
