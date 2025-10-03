import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import "../config.js";

export const register = async (req,res) => {
    try {
        const {email , password} = req.body;
        const isUsed = await User.find({email});
        //if not found 
        if(isUsed.length) {
            return res.status(400).json({
                message: "Username is already used"
            });
        }
        // if found
        const salt = bcrypt.genSaltSync(10); // hashing password
        const hash = bcrypt.hashSync(password,salt);
        const newUser = new User({email,password:hash});
        await newUser.save();
        res.json({
            message: "User successfully registered"
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed"
        });
    }
}

export const login = async (req,res) =>{
    try{
        const {email,password} = req.body;

        const user = await User.find({email});
        if(!user.length){
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password,user[0]._doc.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Invalid login or password"
            });
        }   
        const token = jwt.sign({
            id: user[0]._doc._id
        },process.env.JWT_SECRET,{
            expiresIn: "1d"
        });
        res.json({
            user: {
                ...user[0]._doc,
                password: ""
            },
            token
        }); 
    } catch (error) {
        res.status(500).json({
            message: "Login failed"
        });     
    }
}

