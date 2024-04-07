const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("authHeader token :", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json
    (
      {
        success: false,
        message: "Unauthorized: Missing or invalid token",
      }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

//

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
      return next();
  }
  res.status(403).json({ message: "Unauthorized" });
}


module.exports = { authMiddleware ,isAdmin };
