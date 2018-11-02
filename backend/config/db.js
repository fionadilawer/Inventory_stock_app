import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';  //using asyncHandler dependency... to handle all error in a func...


//connection configuration
const db = asyncHandler( async () => {
    const conn = await mongoose
    .connect(process.env.MONGO_DB);
    console.log(`DATABASE Connected: ${conn.connection.host}`);
  });
  

export default db;