import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/auth.js';
import connectToDB from './config/db.js';
import {errorHandler} from './middleware/error.js';

dotenv.config({path: "./config.env"});

connectToDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/auth', router);

//Last middleware should be errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 6969;

const server = app.listen(PORT, () => console.log(`server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});