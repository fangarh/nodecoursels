const Express = require("express");
const Router = Express.Router();
module.exports = ExpressLayer = () => {
  const app = Express();

  return {
    name: "express",
    initView: (viewPath, staticPath) => {
      app.use(Express.static(staticPath));

      app.set("views", viewPath);
      app.set("view engine", "pug");
    },
    appendGetRender: (uri, view, controller) => {
      Router.get(uri, function (req, res, next) {
        let controllerResultParams = controller(req.body) || {};
        res.render(view, controllerResultParams);
      });
      app.use(uri, Router);
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
