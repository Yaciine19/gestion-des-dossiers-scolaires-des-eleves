import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

    let decoded;

    try {
       decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.status(401).json({massage: 'Unauthorized - Invalid token', error: error.message})
    }

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Unauthorized - User not found" });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

// For Controlling roles

export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden - You do not have permission to access this resource"
            })
        }
        next();
    }
}
