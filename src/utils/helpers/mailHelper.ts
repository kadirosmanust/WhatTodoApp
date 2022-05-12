import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default smtpTransport;
