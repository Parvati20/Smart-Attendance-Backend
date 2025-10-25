import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { markQRAttendance, markKitchenTurn ,getTodayAttendance,getAttendanceHistory } from "../controllers/attendanceController.js";


const router = express.Router();


router.post("/mark", verifyToken, markQRAttendance);

router.post("/kitchen", verifyToken, markKitchenTurn);
router.get("/today", verifyToken, getTodayAttendance);
router.get("/history/:studentId", verifyToken, getAttendanceHistory);



export default router;


