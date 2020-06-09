const Koa = require("koa");
const Pug = require("koa-pug");
const Rout = require("koa-router");
const Stat = require("koa-static");
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
    appendGetRender: (uri, view) => {
      Router.get(uri, async function (ctx, next) {
        return await ctx.render(view);
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
