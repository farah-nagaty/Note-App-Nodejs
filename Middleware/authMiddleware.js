const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        //Get Token From req.headers
        const authHeaders = req.headers.authHeaders;
        if (!authHeaders) return res.status(401).json({ msg: "Token Required" });
        //Get Token value -> Sring Token
        const token = authHeaders.split(" ")[1];
        //Token value verify -> payload  
        const payload = jwt.verify(token, process.env.JWT_SK);
        
        req.user = payload.id;
        //next
        next();
    }catch (error) {
        return res.status(401).json({ msg: "Token Invalid" });
    }
}

module.exports = authMiddleware;