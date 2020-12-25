const Koa = require("koa");
const Pug = require("koa-pug");
const Rout = require("koa-router");
const Stat = require("koa-static");
const session = require("koa-session");
const KoaBody = require("koa-body");
const Constants = require("../const/const");

const Router = new Rout();

module.exports = KoaLayer = () => {
  const app = new Koa();
  let pug = {};

  return {
    name: "koa", 
    initSession: (defaults) => {
      app.use(session(Constants.koaSessionConfig, app));
      app.use(async (ctx, next) => {
        if (!ctx.session.myStore) ctx.session.myStore = defaults; //{ msglogin: "", isAuth: false };
        return next();
      });
    },
    initView: (viewPath, staticPath) => {
      pug = new Pug({
        app: app,
        viewPath: viewPath,
      });
      app.use(Stat(staticPath));
    },
    appendGetRender: (uri, view, controller) => {
      Router.get(uri, async function (ctx, next) {
        if (controller) {
          let controllerResultParams = controller(
            ctx.request,
            ctx.response,
            ctx.session
          );
          return await ctx.render(view, {
            ...ctx.session.myStore,
            ...controllerResultParams,
          });
        } else return await ctx.render(view, ctx.session.myStore);
      });
    },
    appendPost: (uri, validator, controller, redirectUri) => {
      Router.post(
        uri,
        KoaBody({
          formidable: { uploadDir: "./public/img/" }, //This is where the files would come
          multipart: true,
        }),
        async function (ctx, next) {
          //validation will be here
          if (validator(ctx.request, ctx.response, ctx.session, next))
            return next();

          if (redirectUri === Constants.noRedirectTemplate)
            ctx.redirect(ctx.originalUrl);
          else ctx.redirect(redirectUri);
        },
        async function (ctx, next) {
          controller(ctx.request, ctx.response, ctx.session);

          if (redirectUri === Constants.noRedirectTemplate)
            ctx.redirect(ctx.originalUrl);
          else ctx.redirect(redirectUri);

          // return next();
        }
      );
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
