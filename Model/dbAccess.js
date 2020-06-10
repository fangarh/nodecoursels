const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./Model/db.json");

const db = low(adapter);

const getUser = () => db.getState().user;
const getUserInfo = () => db.getState().userInfo;
const getGoods = () => db.getState().goods;
const addGoods = ({ name, price, picture }) =>
  db
    .get("goods")
    .push({
      name,
      price,
      picture,
    })
    .write();

const saveUser = ({ email, hash, salt }) =>
  db.set("user", { email, hash, salt }).write();
const saveUserInfo = ({ age, concerts, cities, years }) =>
  db.set("userInfo", { age, concerts, cities, years }).write();

module.exports = {
  getUser,
  getGoods,
  addGoods,
  saveUser,
  getUserInfo,
  saveUserInfo,
};
