import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import {errorHandler} from '../middlewares/errors.js'
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();


//@desc      SIGNUP funct...
//@route    POST /api/auth/signup
//@access    public
export const signup = asyncHandler(async (req, res, next)=>{

    const {username, email, password} = req.body;

    //validating the input fields
    //if (!username || !email || !password) return next(errorHandler(400, 'please, fill in all required fields'));
    
    //validating the password length
    //if(password.length < 6) return next(errorHandler(400, 'password must be up to 6 character'));

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
    const {email, password} = req.body;

    //validating the input fields
    if (!email || !password) return next(errorHandler(400, 'please, fill in all required fields'));

    //checking if user exit
    const userExit = await User.findOne({email});
    if(!userExit) return next(errorHandler(400, 'wrong credentail'));

    //checking if password is correct
    const validPassword = bcryptjs.compareSync(password, userExit.password);
    if(!validPassword) return next(errorHandler(401, 'wrong credentail'));
    const token = jwt.sign({id: userExit._id}, process.env.JWT_SECRET);

     //hiding the password 
     const {password: pass, ...rest } = userExit._doc; 

    try {
         if (userExit && validPassword) {
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // expires in 1-day
                sameSite: "none",
                secure: true,
              })
            .status(200).json(rest);
        }
    } catch (error) {
        next(error  )
    }

});



//@desc      SIGNOUT funct...
//@route    GET /api/auth/signout
//@access    public
export const signout = asyncHandler(async (req, res, next)=>{
    try {
        res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0),  //expires now
            sameSite: "none",
            secure: true,
        })
        .status(200).json({message: "signout successfull"});
    } catch (error) {
        next(error)
    }
});


//@desc      signing with google funct...
//@route    POST /api/auth/google
//@access    public
export const google = asyncHandler(async(req, res, next)=>{
    try {
        //validating the email input field
      if (!req.body.email) return next(errorHandler(400, 'please, fill in the required fields'));

        const userExit = await User.findOne({ email: req.body.email });
        if (userExit) {
          const token = jwt.sign({ id: userExit._id }, process.env.JWT_SECRET);
          const { password: pass, ...rest } = userExit._doc;
          res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        } else {

            //generating a username base on the email
            let username = generateUsernameFromEmail(req.body.email);

          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
        
            //the new user
          const newUser = new User({
            username,
            email: req.body.email,
            password: generatedPassword,
            photo: req.body.photo,
          });
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password: pass, ...rest } = newUser._doc;
          res.cookie('access_token', token,
            { 
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),  //expires in 1-day
                sameSite: "none",
                secure: true,
            })
            .status(200)
            .json(rest);
        }
      } catch (error) {
        next(error);
      }
});


//generating userName from email
function generateUsernameFromEmail(email) {
    // Split the email address using "@" and take the part before "@"
    const parts = email.split('@');
    if (parts.length > 0) {
      return parts[0];
    } else {
      // If the email address doesn't contain "@", use a default username
      return "defaultUsername";
    }
};


