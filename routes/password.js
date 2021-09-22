const express = require('express');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

const User = require('../models/User');

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const smtpTransport = nodemailer.createTransport({
    host: process.env.EMAIL_PROVIDER,
    secure: true, // use TLS
    port: process.env.SMTP_PORT,
    auth: {
      user: email,
      pass: password,
    },
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: '.hbs',
      defaultLayout: null,
      partialsDir: './templates/',
      layoutsDir: './templates/'
    },
    viewPath: path.resolve('./templates/'),
    extName: '.html',
  };

smtpTransport.use('compile', hbs(handlebarsOptions));

router.post('/forgot-password', async (request, response) => {
    const userEmail = request.body.email;

    const user = await User.findOne({email: userEmail});
    if (!user){
        response.status(400).json({message: 'invalid body', status: 400});
        return;
    }

    // create user token
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');

    // update user reset passworkd token and exp
    await User.findByIdAndUpdate({_id: user._id}, {resetToken: token, resetTokenExp: Date.now() + 600000})

    const emailOptions = {
        to: userEmail,
        from: email,
        template: 'forgot-password',
        subject: 'Zenva Phaser MMO Password Reset',
        context: {
        name: user.username,
        url: `http://localhost:${process.env.PORT || 3000}?token=${token}`,
        },
    };

    // send user password reset email
    await smtpTransport.sendMail(emailOptions);


    response.status(200).json({
        message: `An email has been sent to your email address. Password reset link is only valid for 10 minutes`,
        status: 200
    });
});

router.post('/reset-password', async (request, response) => {
    const userEmail = request.body.email;
    const user = await User.findOne({
        resetToken: request.body.token,
        resetToken: {$gt: Date.now()},
        email:userEmail
    });

    if(!user){
        response.status(400).json({
            message: 'invalid token',
            status: 400
        });
    }

    // ensure password was provided, and matches the verified password
    if(!request.body.password || !request.body.verifiedPassword || 
        request.body.password !== request.body.verifiedPassword){
            response.status(400).json({message: 'passwords do not match', status: 400});
            return;
        }

    // update user model
    user.password = request.body.password;
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();

    const emailOptions = {
        to: userEmail,
        from: email,
        template: 'reset-password',
        subject: 'Zenva Phaser MMO Password Reset Confirmation',
        context: {
            name: user.username,
        }
    }

    // send user password reset email
    await smtpTransport.sendMail(emailOptions);


    response.status(200).json({
        message: `Password Updated`,
        status: 200
    });
});

module.exports = router;