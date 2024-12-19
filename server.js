const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 8080;

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stoutmgm@gmail.com',
        pass: 'Tikka1234'
    }
});

app.post('/sendEmail', (req, res) => {
    const { date, time, activity } = req.body;

    const mailOptions = {
        from: 'stoutmgm@gmail.com',
        to: 'stoutmgm@gmail.com',
        subject: 'Romantic Date Scheduled',
        text: `Your romantic date is scheduled for ${date} at ${time} for a ${activity}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send({ status: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send({ status: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
