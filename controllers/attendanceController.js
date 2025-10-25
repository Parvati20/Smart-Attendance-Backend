
import Attendance from "../models/Attendance.js";

export const markQRAttendance = async (req, res) => {
  const studentId = req.user.id;
  const { slot } = req.body;

  try {
    const today = new Date().toISOString().split("T")[0];
    let record = await Attendance.findOne({ student: studentId, date: today });

    if (!record) {
      record = new Attendance({ student: studentId, date: today });
    }

    record.slots[slot] = "Present";
    await record.save();

    res.status(200).json({ message: "Attendance marked ", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markKitchenTurn = async (req, res) => {
  const studentId = req.user.id;

  try {
    const today = new Date().toISOString().split("T")[0];
    let record = await Attendance.findOne({ student: studentId, date: today });

    if (!record) {
      record = new Attendance({ student: studentId, date: today });
    }

    record.slots.slot1 = "Kitchen";
    record.slots.slot2 = "Kitchen";
    record.slots.slot3 = "Kitchen";

    await record.save();

    res.status(200).json({ message: "Kitchen duty marked 🍴", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTodayAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const record = await Attendance.findOne({ student: studentId, date: today });

    if (!record) {
      return res.status(200).json({
        message: "No attendance marked yet for today.",
        slots: {
          slot1: "Not Marked",
          slot2: "Not Marked",
          slot3: "Not Marked",
        },
      });
    }

    res.status(200).json({
      message: "Today's attendance fetched successfully.",
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAttendanceHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ student: studentId })
      .sort({ date: -1 }); 

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};