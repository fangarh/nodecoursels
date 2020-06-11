const bodyParser = require("body-parser");
const Express = require("express");
const session = require("express-session");
const bb = require("express-busboy");
const Constants = require("../const/const");
const Router = Express.Router();
module.exports = ExpressLayer = () => {
  const app = Express();

  return {
    name: "express",
    initSession: (defaults) => {
      app.use(session(Constants.expressSessionConfig));
      app.use(function (req, res, next) {
        console.log("session middleware");
        if (!req.session.myStore) {
          console.log("session pre init");
          req.session.myStore = defaults; //{ msglogin: "", isAuth: false };
        }
        return next();
      });
    },
    initView: (viewPath, staticPath) => {
      app.use(Express.static(staticPath));
      bb.extend(app, { upload: true, path: "./public/img", allowedPath: /./ });
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      
      app.set("views", viewPath);
      app.set("view engine", "pug");
    },
    appendGetRender: (uri, view, controller) => {
      Router.get(uri, function (req, res, next) {
        if (controller) {
          let controllerResultParams = controller(req, res, req.session);
          res.render(view, {
            ...req.session.myStore,
            ...controllerResultParams,
          });
        } else res.render(view, req.session.myStore);
      });
      app.use(uri, Router);
    },
    appendPost: (uri, validator, controller, redirectUri) => {
      Router.post(
        uri,
        function (req, res, next) {
          if (validator(req, res, req.session, next)) return next();
          if (redirectUri === Constants.noRedirectTemplate)
            res.redirect(req.route.path);
          else res.redirect(redirectUri);
        },
        function (req, res, next) {
          controller(req, res, req.session);

          if (redirectUri === Constants.noRedirectTemplate)
            res.redirect(req.route.path);
          else res.redirect(redirectUri);
        }
      );
    },
    finalizeRoute: () => {},
    use: () => {},
    Prebuild: () => {},
    start: (host, port) => {
      console.log("express started");
      app.listen(port, () => {
        console.log("Listen started");
      });
    },
  };
};
