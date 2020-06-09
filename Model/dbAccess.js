const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./Model/db.json");

const db = low(adapter);

const getUser = () => db.getState().user;
const getGoods = () => db.getState().goods;
const addGoods = ({ name, prise, picture }) =>
  db
    .get("goods")
    .push({
      name,
      price,
      picture,
    })
    .write();
const saveUser = ({ login, hash, salt }) =>
  db.set("user", { login, hash, salt }).write();

module.exports = {
  getUser,
  getGoods,
  addGoods,
  saveUser,
};
