const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT and role
const verifyToken = (requiredRole) => (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "Access Denied!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token!" });

    // Check if the user's role matches the required role
    if (user.role !== requiredRole) {
      return res.status(403).json({ message: "Access Denied! Role mismatch." });
    }

    req.user = user; // Attach decoded user info to request
    next();
  });
};

module.exports = verifyToken;
