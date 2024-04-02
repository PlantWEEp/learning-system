 const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    } 

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if(decoded.role === 'admin'){ 
            req.userId = decoded.userId; 
            next();
        } else {
            return res.status(403).json({ message: "Forbidden" });  
        }

    } catch (err) {
        return res.status(403).json({});
    }
}; 

module.exports = {
    authMiddleware
};
