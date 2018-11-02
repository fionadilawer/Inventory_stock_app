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
    };
  
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
  

  //@desc      GETTING_ALL_PRODUCT funct...
  //@route    POST /api/product/getproduct
  //@access    public
  export const getUserProduct = asyncHandler(async (req, res, next)=>{
    try {
      //GETTING THE PRODUCT THAT THE USER CREATED
      const products = await Product.find({ user: req.user.id }).sort("-createdAt");  //sorting it to show first
       res.status(200).json(products);
    } catch (error) {
      next(error)
    }
  });



  //@desc   GETTING_SINGLE_PRODUCT funct...
  //@route    POST /api/product/singleproduct/:id
  //@access    public
  export const getsingleProduct = asyncHandler(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) return next(errorHandler(404, 'User not authorized'));
    
    // Match product to its user
    if (product.user.toString() !== req.user.id) return next(errorHandler(401, 'User not authorized'));
    
    res.status(200).json(product);
  });



  //@desc   DELETING_SINGLE_PRODUCT funct...
  //@route    POST /api/product/deleteproduct/:id
  //@access    public
  export const deleteproduct = asyncHandler(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) return next(errorHandler(404, "Product not found"))
    
    // Match product to its user
    if (product.user.toString() !== req.user.id) return next(errorHandler(401, 'User not authorized'))

    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Product deleted."});
   } catch(error) {
     next(error);
   };
    
  });




  //@desc    UPDATING_SINGLE_PRODUCT funct...
  //@route    POST /api/product/updatepproduct/:id
  //@access    public
  export const updateproduct = asyncHandler(async (req, res, next)=>{
    const { name, category, quantity, price, description } = req.body;  //all are required
    const { id } = req.params;

    const productExist = await Product.findById(id);

    // if product doesnt exist
   if (!productExist) return next(errorHandler(404, 'Product not found'));
  
   // Match product to its user
  if (productExist.user.toString() !== req.user.id) return next(errorHandler(401, 'User not authorized'));

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "e-ventory",
        resource_type: "image",
      });
    } catch (error) {
      next(error);
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? productExist?.image : fileData,
    },
    {
      new: true, 
      runValidators: true,  //setting validators
    }
  );

  res.status(200).json(updatedProduct);

  })