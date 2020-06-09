"use strict";
let Server = require("./EngineWrapper/ServerWrapper");
const Constants = require("./const/const");

console.log("cool!");
console.log(Constants);

const server = Server(Constants.engine);
server.initView();
server.appendGetRender("/", "./pages/index.pug");
server.finalizeRoute();
server.Start(Constants.host, Constants.port);
