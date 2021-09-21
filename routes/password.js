const express = require('express');
const router = express.Router();
const hbs = require('node-mailer-express-handlebars');
const nodemailer = erquire('nodemailer');
const path = require('path');

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const smtpTransport = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user:email,
        pass: password
    }
});

const handlebarsOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './templates/',
        layoutsDir: './templates/'
    },
    viewPath: path.resolve('./templates/'),
    extName: '.html'
}

smptpTransport.use('compile', hbs(handlebarsOptions));

router.post('/forgot-password', (request, response) => {
    if(!request.body || !request.body.email){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        const { email } = request.body;
        response.status(200).json({
            message: `forgot password requested for email: ${email}`,
            status: 200
        });
    }
});

router.post('/reset-password', (request, response) => {
    if(!request.body || !request.body.email){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        const { email } = request.body;
        response.status(200).json({
            message: `password reset requested for email: ${email}`,
            status: 200
        });
    }
});

module.exports = router;