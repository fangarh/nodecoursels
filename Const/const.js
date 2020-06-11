#! /usr/bin/env node
"use strict";

// Pass configuration to application
module.exports = {
  port: 3000,
  host: "localhost",
  engine: "express",
  noRedirectTemplate: "#####",
  koaSessionConfig: {
    key: "task_3_4_sess_key_koa",
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false,
    myStore: { msglogin: "!!!" },
  },
  expressSessionConfig: {
    key: "task_3_4_sess_key_express",
    secret: "???",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60000,
    },
    saveUninitialized: false,
    resave: false,
  },
};
