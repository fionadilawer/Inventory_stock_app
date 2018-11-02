import asyncHandler from 'express-async-handler';
import Product from '../model/product.model.js';
import {errorHandler} from '../middlewares/errors.js';




//@desc      CREATING_A_PRODUCT funct...
//@route    POST /api/product/createproduct
//@access    public
export const createProduct = asyncHandler(async (req, res, next)=>{
     const {name, sku, category, quantity, price, description } = req.body;

       //   Validation
  if (!name || !category || !quantity || !price || !description) return next(errorHandler(400, 'Please fill in all required fields'));
  
});




