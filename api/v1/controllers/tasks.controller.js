const Task = require(".././models/task.model");
const paginationHelper = require("../../.././helpers/paginationHelper");
class Controller {
  //[GET] /tasks
  async index(req, res) {
    const find = { deleted: false };
    const sort = {};

    //Phan trang
    const taskCounts = await Task.countDocuments({});
    let objectPagination = paginationHelper({
      currentPage: req.query.page || 1,
      limitItems: req.query.limit || 3,
      totalItems: taskCounts,
    });

    //Tim kiem
    if (req.query.keyword) {
      find.title = new RegExp(req.query.keyword, "i");
    }

    //Bo loc theo trang thai
    if (req.query.status) {
      find.status = req.query.status;
    }

    //Sap xep theo tieu chi
    if (req.query.sortKey) {
      let defaultSort = req.query.sortValue || "desc";
      sort[req.query.sortKey] = defaultSort;
    }

    const data = await Task.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.itemsSkip);
    res.json(data);
  }

  //[GET] /tasks/detail/:id
  async detail(req, res) {
    try {
      const id = req.params.id;
      const task = await Task.find({ _id: id });
      res.json(task);
    } catch (err) {
      res.status(404).json({
        message: "Khong tim thay task can tim",
      });
    }
  }

  //[POST] /tasks/create
  async create(req, res) {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(200).json({
      message: "Tao task moi thanh cong",
      task: newTask,
    });
  }

  //[DELETE] /tasks/delete/:id
  async delete(req, res) {
    try {
      const id = req.params.id;
      await Task.updateOne({ _id: id }, { deleted: true });
      res.status(200).json({
        message: "Delete task thanh cong",
      });
    } catch (err) {
      res.status(404).json({
        message: "Khong tim thay task can tim",
      });
    }
  }

  //[PATCH] /tasks/edit/:id
  async edit(req, res) {
    try {
      console.log(req.body);
      const id = req.params.id;
      await Task.updateOne({ _id: id }, req.body);
      res.status(200).json({
        message: "Cap nhat task thanh cong",
      });
    } catch (err) {
      res.status(404).json({
        message: "Khong tim thay task can tim",
      });
    }
  }

  //[PATCH] /tasks/change-status/:id
  async changeStatus(req, res) {
    try {
      const id = req.params.id;
      await Task.updateOne(
        { _id: id },
        {
          status: req.body.status,
        },
      );
      res.status(200).json({
        message: "Update status thanh cong",
      });
    } catch (err) {
      res.status(404).json({
        message: "Khong tim thay task can tim",
      });
    }
  }

  //[PATCH] /tasks/change-multi
  async changeMulti(req, res) {
    const ids = req.body.ids;
    switch (req.body.key) {
      case "status":
        await Task.updateMany(
          { _id: { $in: ids } },
          {
            status: req.body.value,
          },
        );
        res.status(200).json({
          message: "Cap nhat thanh cong",
        });
        break;
      case "delete":
        await Task.updateMany(
          { _id: { $in: ids } },
          {
            deleted: true,
          },
        );
        res.status(200).json({
          message: "Cap nhat thanh cong",
        });
        break;
    }
  }
}

module.exports = new Controller();
