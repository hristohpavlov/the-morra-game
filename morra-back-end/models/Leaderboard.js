import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const LeaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    highscore: {
        type: Number,
        required: [true, "Please provide highscore"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    }
});

LeaderboardSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE});
}


export const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);