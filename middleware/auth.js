require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const token = req.header('x-auth-token');
    // console.log(req.header);
    // console.log(`token :${token}\n`);

    if(!token)
        return res.status(401).json({msg: 'Auth Needed !'});
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg: 'Token is invalid'});
    }
};