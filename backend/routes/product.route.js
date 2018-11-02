import express from 'express';
import { VerifyUserToken } from '../middlewares/verify.user.js';
import { 
    createProduct, 
    getUserProduct, 
    getsingleProduct, 
    deleteproduct
} from '../controllers/product.controller.js';
import { upload } from '../utils/fileUpload.js';


const productRouter = express.Router();

//adding the upload image to the createProduct (signle image at a time).
productRouter.post('/createproduct', VerifyUserToken, upload.single("image"), createProduct);
productRouter.get('/getproduct', VerifyUserToken, getUserProduct);
productRouter.get('/singleproduct/:id', VerifyUserToken, getsingleProduct);
productRouter.delete('/deleteproduct/:id', VerifyUserToken, deleteproduct);

export default productRouter;


