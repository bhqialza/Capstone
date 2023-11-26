import formData from 'form-data';
import Mailgun from 'mailgun.js';

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: API_KEY });

export const sendEmail = async (email, otp) => {
    try {
        const data = {
            from: 'TrashArt <TrashArt@ranolangari.me>',
            to: email,
            subject: 'OTP Verification',
            text: 'OTP Verification',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {font-family: Arial, sans-serif;}
                .container {width: 80%; margin: 0 auto;}
                .header {background-color: #f8f9fa; padding: 20px; text-align: center;}
                .main {padding: 20px; text-align: center;}
                .footer {background-color: #f8f9fa; padding: 20px; text-align: center;}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to TrashArt</h1>
                </div>
                <div class="main">
                    <p>Your OTP for verification is:</p>
                    <h2>${otp}</h2>
                    <p>Please enter this OTP to verify your email address.</p>
                </div>
                <div class="footer">
                    <p>Thank you for choosing TrashArt!</p>
                </div>
            </div>
        </body>
        </html>
    `,
        };

        const result = await client.messages.create(DOMAIN, data);
    } catch (error) {
        console.error(error);
    }
}