import express from 'express';
import { contactus } from '../controllers/contact.controller.js';
import { VerifyUserToken } from '../middlewares/verify.user.js';

const contactRouter = express.Router();

contactRouter.post('/', VerifyUserToken, contactus);


export default contactRouter;