
const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Finance Tracker Verification Code",
    text: `Your verification code is: ${otp}`
  });
};

module.exports = sendOTP;
