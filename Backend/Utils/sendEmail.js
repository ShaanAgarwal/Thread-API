const nodemailer = require('nodemailer');

const sendVerificationMail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "agarwalshaan27@gmail.com",
            pass: "wsfh yynr byub lfkk",
        },
    });
    const mailOptions = {
        from: "agarwalshaan27@gmail.com",
        to: email,
        subject: 'Email Verification',
        text: `https://thread-api-six.vercel.app/api/user/verify/${verificationToken}`,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

module.exports = sendVerificationMail;