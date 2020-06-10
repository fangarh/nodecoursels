module.exports = logonController = (req, resp) => {
  console.log(">>", req);
  return {
    status: 200,
    body: {
      mes: "Done",
      status: "OK",
    },
  };
};
