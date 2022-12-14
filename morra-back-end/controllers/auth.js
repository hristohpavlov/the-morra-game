import { User } from "../models/User.js";
import crypto from 'crypto';
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";

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

        sendLoginToken(user, 200, res);
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

export async function forgotpassword(req, res, next) {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken();
    
        await user.save();

        const resetUrl = `${process.env.WEBSITE_URL}/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password</h1>
            <p>Follow this link, to reset your password</p>
            <a href=${resetUrl} clicktracking=off>Reset password link</a>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: "Reset password",
                text: message
            });
            res.status(200).json({ success: true, data: "Email sent"})
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500))
        }
    } catch (error) {
        next(error);
    }
}

export async function resetpassword(req, res, next) {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password has been reset successfully"
        })
    } catch (error) {
        next(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token})
}

const sendLoginToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, username: user.username})
}