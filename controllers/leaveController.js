
import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { startDate, endDate, type, reason } = req.body;

    const newLeave = new Leave({
      student: studentId,
      startDate,
      endDate,
      type,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave request submitted ", leave: newLeave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaveStatus = async (req, res) => {
  try {
    const studentId = req.user.id;
    const leaves = await Leave.find({ student: studentId }).sort({ appliedAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body; 

    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = status;
    await leave.save();

    res.status(200).json({ message: `Leave ${status.toLowerCase()} `, leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

