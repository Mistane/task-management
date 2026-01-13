const taskRoute = require("./task.route");
const systemVar = require("../../.././config/system.js");
const apiPath = systemVar.defaultApiPath;

module.exports = (app) => {
  app.use(`${apiPath}/tasks`, taskRoute);
};
