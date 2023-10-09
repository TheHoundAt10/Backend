const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    let token = req.header("x-auth-token")

    jwt.verify(
        token, 
        process.env.JWT_SECRET,
        (err, decoded)=>{
            if(err){
                res.status(401).json({
                    message: 'Authentication failed'
                })
            } else {
                req.userID = decoded.userID
                next();
            }
        }
    );
};

module.exports = authentication