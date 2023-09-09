const jwt = require("jsonwebtoken");
const ENV = require("../config.js");

// Middleware for JWT authentication
const authAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing authorization token." });
  }
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const role = decoded.role;

    if (role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authAdmin;

