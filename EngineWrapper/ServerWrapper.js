let ExpressLayer = require("./ExpressLayer");
let KoaLayer = require("./KoaLayer");
let path = require("path");

module.exports = ServerWrapper = (engine) => {
  let _engine = {};

  console.log("engine : ", engine);

  switch (engine) {
    case "koa":
      _engine = KoaLayer();
      break;
    case "express":
      _engine = ExpressLayer();
      break;
    default:
      _engine = ExpressLayer();
      break;
  }
  console.log(_engine);
  let routeBuilded = false;

  let buildCheck = (state = true) => {
    if (routeBuilded === state) throw new Error("Rout builder sequence error");
  };

  return {
    initView: () => {
      buildCheck();
      _engine.initView(
        path.join(__dirname, "../view"),
        path.join(__dirname, "../public")
      );
    },

    appendGetRender: (uri, page) => {
      buildCheck();
      _engine.appendGetRender(uri, page);
    },

    finalizeRoute: () => {
      routeBuilded = true;
      _engine.finalizeRoute();
    },

    Start: (host, port) => {
      buildCheck(false);
      _engine.start(host, port);
    },
  };
};
