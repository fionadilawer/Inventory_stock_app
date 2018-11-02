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
    }  //not compulsory
  });
    

  //options for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      //console.log(err);
      next(err)
    } else {
        next(info)
      //console.log(info);
    }
  });

});