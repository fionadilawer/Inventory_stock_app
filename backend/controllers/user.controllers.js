import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import {errorHandler} from '../utils/errors.js'
import jwt from 'jsonwebtoken';


//@desc      SIGNUP funct...
//@route    POST /api/auth/signup
//@access    public
export const signup = asyncHandler(async (req, res, next)=>{

    const {username, email, password} = req.body;

    //validating the input fields
    if (!username || !email || !password) return next(errorHandler(400, 'please, fill in all required fields'));  
    
    //validating the password length
    if(password.length < 6) return next(errorHandler(400, 'password must be up to 6 character')); 

    //checking if users already exist...
    const userExist = await User.findOne({email});
    if(userExist) return next(errorHandler(400, 'user already been registered'));
    
    //The password is already Encrypted in the user model;
    const createUser = await User.create({
        username,
        email,
        password
    });

    //generate token
    const token = jwt.sign({id: createUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    try {
        if(createUser) return res.cookie('access_token', token, 
        { 
            httpOnly: true, 
            expires: new Date(Date.now()  + 1000 * 86400), //expires in 1-day
            sameSite: "none",
            secure: true
        })
        .status(201).json('user created successfully');
    } catch (error) {
        next(error);
    };

});


//@desc      SIGNIN funct...
//@route    POST /api/auth/signin
//@access    public
export const signin = asyncHandler(async(req, res, next)=>{

})


