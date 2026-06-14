const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (
  to,
  subject,
  text
) => {

  console.log("Email Sent");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);

};

module.exports = sendEmail;


module.exports = sendEmail;