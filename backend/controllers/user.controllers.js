import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/errors.js'
import jwt from 'jsonwebtoken';


//@desc      SIGNUP funct...
//@route    POST /api/auth/signup
//@access    public
export const signup = asyncHandler(async (req, res, next)=>{
 
});