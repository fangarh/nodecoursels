"use strict";
let Server = require("./EngineWrapper/ServerWrapper");
const Constants = require("./const/const");
const logonContr = require("./Controller/logonController");
const indexController = require("./Controller/indexController");

console.log("cool!");
console.log(Constants);

const server = Server(Constants.engine);
server.initView();
server.appendGetRender("/", "./pages/index.pug", indexController);
server.appendGetRender("/login", "./pages/login.pug", logonContr);
server.appendGetRender("/admin", "./pages/admin.pug");
server.finalizeRoute();
server.Start(Constants.host, Constants.port);
