const db = require("../Model/dbAccess.js");
const sgMail = require("@sendgrid/mail");

module.exports.indexController = (req, resp, session) => {
  const { age, concerts, cities, years } = db.getUserInfo();
  var skills = [
    {
      number: age,
      text: "Возраст начала занятий на скрипке",
    },
    {
      number: concerts,
      text: "Концертов отыграл",
    },
    {
      number: cities,
      text: "Максимальное число городов в туре",
    },
    {
      number: years,
      text: "Лет на сцене в качестве скрипача",
    },
  ];

  session.myStore.msgskill = "";

  return { skills: skills };
};
module.exports.sendMailController = (req, resp, session) => {
  const { name, email, message } = req.body;

  try {
    console.log(process.env.SEND_GRID_API_KEY);
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
      to: "dds@lgt.ru",
      from: email,
      subject: `Sending email from ${name}`,
      text: message,
    };
    sgMail.send(msg);
    session.myStore.msgemail = "Письмо отправлено.";
  } catch (err) {
    session.myStore.msgemail = err.toString();
  }
};
