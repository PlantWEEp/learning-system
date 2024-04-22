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


    console.log("decoded token" , decoded) ;

    if (decoded.userId) {
      req.user = decoded; 
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

//role auth 
function isAdmin(role) {
  return (req, res, next) => {
    console.log("role middleware", req.user);

    if (req.user && req.user.userRole === role) {
      return next();
    }
    
    res.status(403).json({ message: "Unauthorized" });
  };
}




module.exports = { authMiddleware ,isAdmin };