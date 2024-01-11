import express from 'express';

import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', loginUser);

authRouter.post('/register', registerUser)

authRouter.get('/logout', logoutUser);

export default authRouter;