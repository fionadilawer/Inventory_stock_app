import express from 'express';
import { VerifyUserToken } from '../middlewares/verify.user.js';
import { createProduct } from '../controllers/product.controller.js';
const productRouter = express.Router();
import { upload } from '../utils/fileUpload.js';

//adding the upload image to the createProduct (signle image at a time).
productRouter.post('/createproduct', VerifyUserToken, upload.single("image"), createProduct);


export default productRouter;


