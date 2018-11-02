import asyncHandler from 'express-async-handler';
import {errorHandler} from '../middlewares/errors.js';



//@desc      CONTACT_Us  funct...
//@route    POST /api/api/contact
//@access    public
export const contactus = asyncHandler(async (req, res, next)=>{
    res.send('contact us');
});
