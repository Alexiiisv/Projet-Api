const nodemailer = require("nodemailer");

async function Email(
  sender = '"Fred Foo 👻" <foo@example.com>',
  receiver = "bar@example.com, baz@example.com",
  content = "Hello world?",
  subject = "Hello ✔"
) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: sender, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: content, // plain text body
  });

  //   console.log("Message ID: %s", info.messageId);
  console.log("Email: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = Email;
