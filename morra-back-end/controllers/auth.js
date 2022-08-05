import { User } from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export async function register(req, res, next) {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

export async function login(req, res, next) {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400))
    }
    try {
        const user = await User.findOne({ email }).select("+password")

        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            return next(new ErrorResponse("Invalid Password",401))
        }

        sendToken(user, 200, res);
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

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})
}