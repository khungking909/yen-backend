import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ error: "Not authorized to access this resource" });
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    let data;

    try {
      data = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(403).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ where: { id: data.id }}, { raw: true });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
