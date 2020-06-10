"use strict";
let Server = require("./EngineWrapper/ServerWrapper");
const Constants = require("./const/const");
const logonContr = require("./Controller/logonController");
const adminContr = require("./Controller/adminController");
const indexContr = require("./Controller/indexController");
const validators = require("./Controller/validationController");

console.log("cool!");
console.log(Constants);

const server = Server(Constants.engine);
server.initView();
server.initSession({
  msglogin: "ddd",
  isAuth: false,
  msgskill: "",
  msgfile: "",
});

server.appendGetRender("/", "./pages/index.pug", indexContr.indexController);

server.appendGetRender("/login", "./pages/login.pug");
server.appendPost("/login", validators.loginValidation, logonContr);
server.appendPost(
  "/admin/skills",
  validators.userInfoValidation,
  adminContr.userInfoController,
  "/admin"
);

server.appendPost(
  "/admin/upload",
  validators.addGoodsValidation,
  () => {},
  "/admin"
);

server.appendPost(
  "/",
  validators.sendMailValidation,
  indexContr.sendMailController,
  "/#email"
);

server.appendGetRender("/admin", "./pages/admin.pug");
server.finalizeRoute();
server.Start(Constants.host, Constants.port);
