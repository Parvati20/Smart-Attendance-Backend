import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  slots: {
    slot1: { type: String, enum: ["Present", "Absent", "Leave", "Kitchen"], default: "Absent" },
    slot2: { type: String, enum: ["Present", "Absent", "Leave", "Kitchen"], default: "Absent" },
    slot3: { type: String, enum: ["Present", "Absent", "Leave", "Kitchen"], default: "Absent" },
  },
});

export default mongoose.model("Attendance", attendanceSchema);
