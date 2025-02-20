const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());  // Parse JSON request body
app.use(cors()); // Enable CORS for frontend communication

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nanikavala701@gmail.com',
        pass: 'xgyf brel jtve wydz'  // Use an App Password
    }
});

app.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
        from: 'nanikavala701@gmail.com',
        to: email,  
        subject: subject || 'Lost Item Report',
        text: message || 'Your lost item report has been found. Please refer to the Lost and Found Website !'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Email sending failed' });
        } else {
            console.log('Email sent:', info.response);
            return res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
