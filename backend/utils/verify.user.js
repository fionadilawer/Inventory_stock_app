import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import { errorHandler } from './errors.js';
import jwt from 'jsonwebtoken';

//verifying the authorized user
export const VerifyUserToken = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies.access_token;
        if (!token) return next(errorHandler(401, 'Not authorized, please login'))
    
        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from token
        const user = await User.findById(verified.id).select("password");
    
        if (!user) return next(errorHandler(401, 'User not found'));
        
        req.user = user;
        next();
      } catch (error) {
        next(error)
      }
});

