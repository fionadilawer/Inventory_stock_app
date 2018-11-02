import express from 'express';
import {signup, signin} from '../controllers/user.controllers.js';
const userRouter = express.Router();

//auth routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);

export default userRouter;



