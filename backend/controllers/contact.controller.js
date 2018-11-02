import asyncHandler from 'express-async-handler';
import {errorHandler} from '../middlewares/errors.js';
import User from '../model/user.model.js';
import dotenv from 'dotenv';
import { sendEmail } from '../utils/sendEmail.js';
dotenv.config();


//@desc      CONTACT_Us  funct...
//@route    POST /api/api/contact
//@access    public
export const contactus = asyncHandler(async (req, res, next)=>{
    const { subject, message } = req.body;
    const userExit = await User.findById(req.user._id);
  
  //   Validation
  if (!subject || !message) next(errorHandler(400, 'please fill in all required fields'));


  if (!userExit) return next(errorHandler(400, 'User not found, please signup'));


  const send_to = process.env.EMAIL_USER;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = userExit.email;

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    next(error);
  }

});




