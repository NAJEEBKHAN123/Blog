const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next) =>{

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
      }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()
    
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
}

module.exports = verifyToken;