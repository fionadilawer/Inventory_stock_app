import asyncHandler from 'express-async-handler';
import Product from '../model/product.model.js';
import {errorHandler} from '../middlewares/errors.js';
import { fileSizeFormatter } from '../utils/fileUpload.js';

//@desc      CREATING_A_PRODUCT funct...
//@route    POST /api/product/createproduct
//@access    public
export const createProduct = asyncHandler(async (req, res, next)=>{
     const {name, sku, category, quantity, price, description } = req.body;

    //Validation 
  if (!name || !category || !quantity || !price || !description) return next(errorHandler(400, 'Please fill in all required fields'));


   // Handle Image upload
   let fileData = {};
   if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
     
    fileData = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
    };

   }

    //create the product
    const createdProduct = await Product.create({
        user: req.user.id, //we are getting it req.user.id from the verifyUserToken
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    res.status(201).json(createdProduct);
  
});




