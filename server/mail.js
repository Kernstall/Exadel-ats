const nodemailer = require('nodemailer');

const ourMail = 'universitytestingsystem@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'universitytestingsystem@gmail.com',
    pass: 'WSXedc2018',
  },
});

exports.mailOptions = function (_to, _subject, _text) {
  const obj = {
    from: ourMail,
    to: _to,
    subject: _subject,
    text: _text,
  };
  return obj;
};

exports.sendMail = function (mail) {
  transporter.sendMail(mail, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

