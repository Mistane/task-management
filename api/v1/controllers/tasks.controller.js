const Task = require(".././models/task.model");
class Controller {
  //[GET] /tasks
  async index(req, res) {
    const data = await Task.find({});
    res.json(data);
  }
}

module.exports = new Controller();
