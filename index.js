import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Smart Attendance Backend Running");
});
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log(" MongoDB Connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(` Server running on http://localhost:${process.env.PORT || 5000}`);
  });
})
.catch((err) => console.error(" MongoDB Error:", err));

