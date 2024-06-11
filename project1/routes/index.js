const loginRouter = require("./login-route.js");
const Router = (app) => {
  app.use("/", loginRouter);
};

module.exports = Router;
