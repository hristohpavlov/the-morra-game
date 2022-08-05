import { User } from "../models/User.js";

export async function register(req, res, next) {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password
        });

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: errror.message,
        })
    }
};

export async function login(req, res, next) {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({
            success: false, error: "Please provide email and password"
        })
    }
    try {
        const user = await User.findOne({ email }).select("+password")

        if(!user){
            res.status(404).json({success: false, error: "Invalid Credentials"})
        }

        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            res.status(404).json({success: false, error: "Invalid Credentials"})
        }

        res.status(200).json({
            success: true,
            token: "ja9d8uanqji"
        })
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

export function forgotpassword(req, res, next) {
    res.send("Frogot Password");
}

export function resetpassword(req, res, next) {
    res.send("Reset Password");
}