import { Leaderboard } from "../models/Leaderboard.js";

export async function getPrivateData(req,res,next){
    const { username, highscore, email } = req.body;
    try {
        const leaderboard = await Leaderboard.findOneAndUpdate({email},{highscore},{new:true, upsert: true});

        sendToken(leaderboard, 201, res);
    } catch (error){
        next(error);
    }
}

export async function addScoreToLeaderboard(req,res,next){
    try {
        const all = await Leaderboard.find({});
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(all));
    } catch (error) {
        next(error);
    }
}

const sendToken = (leaderboard, statusCode, res) => {
    const token = leaderboard.getSignedToken();
    res.status(statusCode).json({success: true, token})
}