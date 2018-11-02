import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();


//sending e-mail
export const sendEmail = asyncHandler(async (subject, message, send_to, sent_from, reply_to, next)=>{

    //creatied email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,  //by default
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    },  //not compulsory
    timeout: 10000,  
  });
    

  //options for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

try {
    const info = await transporter.sendMail(options);
    console.log(info);
  } catch (err) {
    console.error(err);
  }

});


