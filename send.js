const nodemailer = require('nodemailer');
const prompt = require('prompt-sync')();

function main() {
  console.log("Welcome to Javascript Mail Spammer!");

  const emails = prompt("[S] Enter your Gmail >> ");
  if (!emails.endsWith("@gmail.com")) {
    console.log("[G] Please use your valid Gmail!");
    return;
  }

  const pswd = prompt("[S] Enter your Gmail Apps Password >> ");
  const target = prompt("[S] Enter your Email Target >> ");
  if (!target.includes("@")) {
    console.log("Please enter a valid target!");
    return;
  }

  const subject = prompt("[G] Enter subject email >> ");
  const message = prompt("[G] Enter your message >> ");
  const amount = prompt("[S] Enter amount of Message >> ");

  return { emails, pswd, target, subject, message, amount };
}

function sendEmail() {
  const { emails, pswd, target, subject, message, amount } = main();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emails,
      pass: pswd
    }
  });

  const mailOptions = {
    from: emails,
    to: target,
    subject: subject,
    text: message
  };

  for (let i = 0; i < amount; i++) {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`${i}. Email sent to ${target} with status: ${info.response} `);
      }
    });
  }
}

sendEmail();
