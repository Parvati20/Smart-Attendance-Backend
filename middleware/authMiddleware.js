import jwt from "jsonwebtoken";

// ✅ JWT verification middleware
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info in req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

