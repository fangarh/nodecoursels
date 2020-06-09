const db = require("../Model/dbAccess.js");

module.exports = indexController = (appParams) => {
  var skills = [
    {
      number: 12,
      text: "Возраст начала занятий на скрипке",
    },
    {
      number: 76,
      text: "Концертов отыграл",
    },
    {
      number: 30,
      text: "Максимальное число городов в туре",
    },
    {
      number: 20,
      text: "Лет 2 на сцене в качестве скрипача",
    },
  ];

  return { skills: db.getGoods() || skills };
};
