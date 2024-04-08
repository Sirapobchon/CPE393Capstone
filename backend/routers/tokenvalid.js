const jwt = require("jsonwebtoken");

module.exports = {
    checktoken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token, process.env.secretJWT, (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        mussage: "Invalid Token"
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            })
        } else {
            res.json({
                success: 0,
                message: "Access denied!"
            })
        }
    }
}