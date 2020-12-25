let ExpressLayer = require("./ExpressLayer");
let KoaLayer = require("./KoaLayer");
let path = require("path");
const Constants = require("../const/const");

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
    initSession: (defaults) => {
      _engine.initSession(defaults);
    },

    initView: () => {
      buildCheck();
      _engine.initView(
        path.join(__dirname, "../view"),
        path.join(__dirname, "../public")
      );
    },

    appendGetRender: (uri, page, contrAction) => {
      buildCheck();
      _engine.appendGetRender(uri, page, contrAction);
    },

    appendPost: (
      uri,
      validator = (req, res, sess, next) => {
        return next();
      },
      contrAction = () => {},
      redirectUri = Constants.noRedirectTemplate
    ) => {
      _engine.appendPost(uri, validator, contrAction, redirectUri);
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
