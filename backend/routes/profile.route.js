import express from 'express';
import { getUser,  loginStatus, updatedUser } from '../controllers/profile.controller.js';
import { VerifyUserToken } from '../utils/verify.user.js';
const profileRouter = express.Router();

profileRouter.get('/getuser', VerifyUserToken, getUser);
profileRouter.get('/userlogin', loginStatus );
profileRouter.patch('/updateprofile', VerifyUserToken, updatedUser);

export default profileRouter;


