import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';
import bodyParser from "body-parser";
import db from "./config/db.js";
import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";
import productRouter from "./routes/product.route.js";

//connection to databas
db()


const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors())

//directing where the imgage will be stored i.e (is this the best option?)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Add body-parser middleware with a higher limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//local host connection
const port = 4000;
app.listen(port, ()=>{
 console.log(`server is running on port ${port}!!!`);
});


//for all routes end-points
app.use('/api/auth', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/product', productRouter);

//middleware for handling errors 
app.use((err, req, res, next)=>{
    const statuscode  = err.statuscode || 500;
    const message = err.message || 'internal Server error';
    return res.status(statuscode).json({
      success: false,
      statuscode,
      message,
    });
});


