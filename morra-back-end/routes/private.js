import express from 'express';
import { addScoreToLeaderboard, getPrivateData } from '../controllers/private.js';
import {protect} from '../middleware/auth.js';

const router = express.Router();

router.route("/").post(getPrivateData);
router.route("/leaderboard").get(addScoreToLeaderboard);

export default router