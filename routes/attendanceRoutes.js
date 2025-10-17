import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { markQRAttendance, markKitchenTurn } from "../controllers/attendanceController.js";

const router = express.Router();


router.post("/mark", verifyToken, markQRAttendance);

router.post("/kitchen", verifyToken, markKitchenTurn);

export default router;


