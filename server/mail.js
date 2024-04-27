const nodemailer = require('nodemailer');


const sendEmail = async (to, subject, text) => {
  try {
   
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      port: 465, 
      secure: true, // Use SSL
      logger: true, // Enable logging
      debug: true, 
      secureConnection: false, 
      auth: {
        user: "bidblogger19@gmail.com",
        pass: "cbzvfcibscbseuty", 
      },
      tls: {
        rejectUnauthorized: false // Allow insecure TLS connections
      }
    });

    // Define email options
    const mailOptions = {
      from: "bidblogger19@gmail.com", 
      to, 
      subject, 
      text, 
    };


    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendEmail;