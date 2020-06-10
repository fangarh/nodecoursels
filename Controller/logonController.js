const db = require("../Model/dbAccess.js");
const psw = require("../Api/password");

module.exports = logonController = (req, resp, session) => {
  const { email, password } = req.body;

  var user = db.getUser();

  if (user.email === email && psw.validPassword(password)) {
    session.myStore.isAuth = true;
    session.myStore.msglogin = "Вы успешно авторизованы.";
  } else {
    session.myStore.isAuth = false;
    session.myStore.msglogin = "Ошибка авторизации.";
  }
};
