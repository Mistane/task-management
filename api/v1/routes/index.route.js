const taskRoute = require("./task.route");
const userRoute = require("./user.route");
const systemVar = require("../../.././config/system.js");
const apiPath = systemVar.defaultApiPath;
const authenMiddleware = require(".././middlewares/checkAuthentication");

module.exports = (app) => {
  app.use(`${apiPath}/tasks`, authenMiddleware, taskRoute);
  app.use(`${apiPath}/users`, userRoute);
};
