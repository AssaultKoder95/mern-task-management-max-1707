import nodemailer from "nodemailer";

function sendEmail({ subject, text, to }) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Abhishek <taskmgmt@gmail.com>",
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject();
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve();
      }
    });
  });
}

export default sendEmail;
