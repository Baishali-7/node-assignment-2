const express = require("express");
const router = express.Router();
const checkTaskExists = require("../middleware/taskNotFound")

const tasksController = require("../controllers/taskController")

router.get("/", tasksController.getAllTasks);
router.get("/:id", tasksController.getTasksById);
router.post("/", tasksController.createTasks);
router.put("/:id",checkTaskExists, tasksController.updateTasks);
router.delete("/:id",checkTaskExists, tasksController.deleteTasks);

module.exports = router;
