import asyncHandler from 'express-async-handler';
import Product from '../model/product.model.js';
import {errorHandler} from '../middlewares/errors.js';
import { fileSizeFormatter } from '../utils/fileUpload.js';
import { cloudinary } from '../utils/setup.js';


//@desc      CREATING_A_PRODUCT funct...
//@route    POST /api/product/createproduct
//@access    public
export const createProduct = asyncHandler(async (req, res, next) => {
    const { name, sku, category, quantity, price, description } = req.body;
  
    // Validation
    if (!name || !category || !quantity || !price || !description) {
      return next(errorHandler(400, 'Please fill in all required fields'));
    }
  
    // Handle Image upload
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      try {
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "e-ventory",
          resource_type: "image",
        });
  
        if (!uploadedFile || !uploadedFile.secure_url) {
          return next(errorHandler(500, 'Image upload failed or secure_url is missing.'));
        }
  
        fileData = {
          fileName: req.file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2),
        };
      } catch (error) {
        return next(error); // Handle the error appropriately
      }
    }
  
    // Create the product
    const createdProduct = await Product.create({
      user: req.user.id, // We are getting it req.user.id from the verifyUserToken
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
  

