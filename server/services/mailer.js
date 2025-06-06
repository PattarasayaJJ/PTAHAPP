const nodemailer = require('nodemailer');

// สร้าง transporter สำหรับ Gmail (หรือ SMTP อื่น ๆ ที่คุณต้องการใช้)
const transporter = nodemailer.createTransport({
  service: 'gmail', // หรือใช้บริการอื่น ๆ เช่น 'smtp.mailtrap.io'
  auth: {
    user: "jptnp20@gmail.com",
    pass: "ixxbibmejiyhjbhg"
  },
});



// ฟังก์ชันส่งอีเมล
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error);
  }
};

module.exports = { sendEmail };