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
    res.status(201).json({ message: "Leave request submitted ✅", leave: newLeave });
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
