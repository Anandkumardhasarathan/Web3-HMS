// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "❌ Access Denied. No token provided." });
  }

  try {
    // ✅ Decode JWT Token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;

    // ✅ Role-Based Access Control (RBAC)
    if (!req.user.role) {
      return res.status(403).json({ message: "❌ Forbidden: Role not found in token." });
    }

    next(); // Proceed to route
  } catch (error) {
    return res.status(400).json({ message: "❌ Invalid token" });
  }
};

// ✅ Middleware to Restrict Access to Doctors Only
const doctorAuth = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "❌ Forbidden: Only doctors can access this resource." });
  }
  next();
};

// ✅ Middleware to Restrict Access to OP Managers Only
const opManagerAuth = (req, res, next) => {
  if (req.user.role !== "opManager") {
    return res.status(403).json({ message: "❌ Forbidden: Only OP Managers can access this resource." });
  }
  next();
};

module.exports = { authMiddleware, doctorAuth, opManagerAuth };
