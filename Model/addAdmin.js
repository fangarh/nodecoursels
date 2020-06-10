const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const db = require("./dbAccess.js");
const psw = require("../Api/password");

let email = "";
let hash = "";
let salt = "";
let password = {};

rl.question("email: ", (answer) => {
  email = answer;
  rl.question("Password: ", (answer) => {
    password = psw.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    rl.close();
  });
});

rl.on("close", () => {
  db.saveUser({ email, hash, salt });
});
