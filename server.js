"use strict";
const Server = require("./EngineWrapper/ServerWrapper");
const Constants = require("./const/const");
const logonContr = require("./Controller/logonController");
const adminContr = require("./Controller/adminController");
const indexContr = require("./Controller/indexController");
const validators = require("./Controller/validationController");
const fs = require("fs");
const path = require("path");
console.log("cool!");
console.log(Constants);
console.log(path.join(process.cwd(), "public", "img"));

if (!fs.existsSync(path.join(process.cwd(), "public", "img")))
  fs.mkdirSync(path.join(process.cwd(), "public", "img"));

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
  adminContr.adminUploadController,
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
