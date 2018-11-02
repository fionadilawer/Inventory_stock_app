import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import {errorHandler} from '../utils/errors.js';
import jwt from 'jsonwebtoken';


//@desc      GET_USER funct...
//@route    GET /api/profile/getuser
//@access    public
export const getUser = asyncHandler(async (req, res, next)=>{

    //the req.user._id (user) is coming from the verify.user.js
  const GetUser = await User.findById(req.user._id);
  try {
      if (GetUser) {
        //hiding the password 
        const {password: pass, ...rest } = GetUser._doc;
        res.status(201).json(rest);
      }else{
        next(errorHandler(401, 'user  not found'));
      }
  } catch (error) {
    next(error)
  };
});


//@desc      LoggedIn funct...
//@route    GET /api/profile/userlogin
//@access    public
export const loginStatus = asyncHandler(async(req, res, next)=>{

    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(200).json({ success: false, message: "User is not logged in" });
            return;
        }

        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (error) {
        next(error);
    }  
});



//@desc      UPDATE_USER funct...
//@route    GET /api/profile/updateprofile
//@access    public
export const updatedUser = asyncHandler(async (req, res, next) => {
    try {
        const userExist = await User.findById(req.user._id);

        if (userExist) {
            // De-structure the data in the model
            const { username, email, phone, photo, bio } = userExist;
            userExist.email = email;
            userExist.username = req.body.username || username;
            userExist.phone = req.body.phone || phone;
            userExist.photo = req.body.photo || photo;
            userExist.bio = req.body.bio || bio;

            const updatedUser = await userExist.save();

            const jsonResponse = {
                _id: updatedUser._id,
                username: updatedUser.username,
                phone: updatedUser.phone,
                photo: updatedUser.photo,
                bio: updatedUser.bio,
            };
            res.status(200).json(jsonResponse);
        } else {
            next(errorHandler(404, 'User not found'))
        }
    } catch (error) {
        // Handle other errors with a 500 response
        next(error)
    }
    
});




















// export const updatedUser = asyncHandler(async (req, res, next)=>{
//     const userExist = await User.findById(req.user._id);

//     try {
//         if (userExist) {    
//             //de-structuring the data in the model
//            const { username, email, phone, photo, bio } = userExist;
//            userExist.email = email;
//            userExist.username  = req.body.username || username;
//            userExist.phone  = req.body.phone || phone;
//            userExist.photo  = req.body.photo || photo;
//            userExist.bio  = req.body.bio || bio;
    
//            const updatedUser = await userExist.save();

//            res.status(200).json({
//               _id: updatedUser._id,
//               username: updatedUser.username,
//               phone: updatedUser.phone,
//               photo: updatedUser.photo,
//               bio: updatedUser.bio,
//            })
//         } else{
//          next(errorHandler(404, 'user not found'));
//         }
//     } catch (error) {
//         next(error);
//     }
// });




