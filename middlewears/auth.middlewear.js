import jwt from 'jsonwebtoken';
import './config.js';
import User from '../models/user.js';

const authorize = async(req, res , next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({message: "Unauthorized"});
    }

    next();
}

module.exports = authorize;