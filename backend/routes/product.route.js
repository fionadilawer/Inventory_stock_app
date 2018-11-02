import express from 'express';
import { VerifyUserToken } from '../middlewares/verify.user.js';
import { createProduct } from '../controllers/product.controller.js';
const productRouter = express.Router();


productRouter.post('/createproduct', VerifyUserToken, createProduct);


export default productRouter;


