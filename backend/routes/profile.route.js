import express from 'express';
import { getUser } from '../controllers/profile.controller.js';
import { VerifyUserToken } from '../utils/verify.user.js';
const profileRouter = express.Router();

profileRouter.get('/getuser', VerifyUserToken, getUser)

export default profileRouter;


