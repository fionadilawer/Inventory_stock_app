import express from 'express';
import {signup} from '../controllers/user.controllers.js';
const userRouter = express.Router();



//auth routes
userRouter.post('/signup', signup);

export default userRouter;