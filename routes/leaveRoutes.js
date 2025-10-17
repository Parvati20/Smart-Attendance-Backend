import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { applyLeave, getLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

router.post("/apply", verifyToken, applyLeave);
router.get("/status", verifyToken, getLeaveStatus);

export default router;

