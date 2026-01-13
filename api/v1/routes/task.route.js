const express = require("express");
const router = express.Router();
const taskController = require(".././controllers/tasks.controller");

router.get("/", taskController.index);
router.post("/create", taskController.create);
router.delete("/delete/:id", taskController.delete);
router.get("/detail/:id", taskController.detail);
router.patch("/edit/:id", taskController.edit);
router.patch("/change-status/:id", taskController.changeStatus);
router.patch("/change-multi", taskController.changeMulti);

module.exports = router;
