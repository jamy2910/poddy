// Imports
import 'express-async-errors';
import express from "express";
import dotenv from 'dotenv';
import authRouter from "./routes/authRouter.js";
import commentRouter from "./routes/commentRouter.js";
import likeRouter from "./routes/likeRouter.js";
import subscribeRouter from "./routes/subscribeRouter.js";
import profileRouter from "./routes/profileRouter.js";
import channelRouter from './routes/channelRouter.js';
import podcastRouter from './routes/podcastRouter.js';
import cookieParser from "cookie-parser";
import accountSettingsRouter from './routes/accountSettingsRouter.js';
import cors from 'cors';

// App initialization
dotenv.config();
const app = express();

// Global middleware
app.use(cors({ credentials: true, origin: true }))
app.use(express.json());
app.use(cookieParser());

// Variables
const port = process.env.PORT;


// Routers
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/channel', channelRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/like', likeRouter);
app.use('/api/v1/subscribe', subscribeRouter);
app.use('/api/v1/podcast', podcastRouter);
app.use('/api/v1/settings', accountSettingsRouter);


// Startup
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});


