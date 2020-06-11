const path = require("path");
const db = require("../Model/dbAccess.js");

module.exports.userInfoController = (req, resp, session) => {
  console.log("1");
  const { age, concerts, cities, years } = req.body;

  console.log(age, concerts, cities, years);
  db.saveUserInfo({ age, concerts, cities, years });
  session.myStore.msglogin = "Сохранено";
};

module.exports.adminUploadController = (req, resp, session) => {
  let fpath =
    req.files.photo.file ||
    path.join(req.files.photo.path, req.files.photo.name);

  const { name: fileName } = req.files.photo;

  let { name, price } = req.body;
  console.log({ name, price, fpath });
  db.addGoods({
    name,
    price,
    src: path.normalize(fpath).replace(path.normalize("public/", "")),
  });
  session.myStore.msgfile = "Товар добавлен";
};
