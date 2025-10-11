import Attendance from "../models/Attendance.js";

// ✅ QR Attendance (Mark Present)
export const markQRAttendance = async (req, res) => {
  const studentId = req.user.id; // from JWT
  const { slot } = req.body;

  try {
    const today = new Date().toISOString().split("T")[0];
    let record = await Attendance.findOne({ student: studentId, date: today });

    if (!record) {
      record = new Attendance({ student: studentId, date: today });
    }

    record.slots[slot] = "Present";
    await record.save();

    res.status(200).json({ message: "Attendance marked ✅", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


