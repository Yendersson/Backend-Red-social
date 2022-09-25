import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'newcommerce235@gmail.com', // generated ethereal user
      pass: 'jtyfhfwrdiatqbgt', // generated ethereal password
    },
  });

  export default transporter;