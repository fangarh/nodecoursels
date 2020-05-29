import express from "express";

const app = express();

const loopCounter = process.env.LS_LOOP_TMCNT;
const loopTimeout = process.env.LS_LOOP_TIMEOUT;

console.log("Start params: ", loopCounter, loopTimeout);

const GetRandomId = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const WaitLoop = (iter, func) => {
  setTimeout(() => {
    let loopTime = new Date().toUTCString();
    console.log(loopTime);

    if (iter > 0) {
      iter -= loopTimeout;
      WaitLoop(iter, func);
    } else func(loopTime);
  }, loopTimeout);
};

const CalcedResponse = () => {
  return new Promise((ok) => {
    WaitLoop(loopCounter, ok);
  });
};

app.get("/", (req, res) => {
  let clientId = GetRandomId(100000);
  console.log(`resived get from ${clientId} `);

  CalcedResponse().then((arg) => {
    console.log(`Sending response for client ${clientId}`);
    res.send(`Client ${clientId} your time arg: ${arg} `);
  });
});

app.listen(3000, () => {
  console.log("Listen started");
});
