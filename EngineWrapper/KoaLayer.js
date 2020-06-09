const Koa = require("koa");
const Pug = require("koa-pug");
const Rout = require("koa-router");
const Stat = require("koa-static");
const KoaBody = require("koa-body");
const Router = new Rout();
module.exports = KoaLayer = () => {
  const app = new Koa();
  let pug = {};

  return {
    name: "koa",
    initView: (viewPath, staticPath) => {
      pug = new Pug({
        app: app,
        viewPath: viewPath,
      });
      app.use(Stat(staticPath));
    },
    appendGetRender: (uri, view, controller) => {
      Router.get(uri, async function (ctx, next) {
        let controllerResultParams = controller(ctx.request.body) || {};
        return await ctx.render(view, controllerResultParams);
      });
    },
    finalizeRoute: () => {
      app.use(Router.routes());
    },
    use: () => {},
    start: (host, port) => {
      console.log("Koa started");
      app.listen(port);
    },
  };
};
