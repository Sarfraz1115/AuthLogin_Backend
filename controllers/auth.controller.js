
import User from '../models/auth.model.js'
import { generateToken } from '../lib/token.js';
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        };
        const user = await User.findOne({email, password});
        if(!user){
            return res.status(404).json({message: "User not found"});
        };
        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id, res)
        });


    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        const newuser = await User.create({
            username,
            email,
            password
        })
        if(newuser){
            await newuser.save();
            res.status(201).json({
                _id: newuser._id,
                email: newuser.email,
                token: generateToken(newuser._id, res)
            });
        }
        else {
            res.status(400).json({ messsage: "invalid user data" })
        }
    } catch (error) {
        console.log("error in signup", error.message);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export const checkauth = async(req, res) => {
    try {
         res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller ", error.message);
        res.status(500).json({message: "internal server error"});
    }
}