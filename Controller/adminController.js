const db = require("../Model/dbAccess.js");

module.exports.userInfoController = (req, resp, session) => {
  console.log("1");
  const { age, concerts, cities, years } = req.body;

  console.log(age, concerts, cities, years);
  db.saveUserInfo({ age, concerts, cities, years });
  session.myStore.msglogin = "Сохранено";
};
