const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../../data/db.json");
let db = require(dbPath);

const validateTaskInput = require('../middleware/validateTaskInput');

const tasksInDB = () => {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  };
  
  const getAllTasks = (req, res) => {
    res.status(200).json(db.tasks);
  };
  
  const getTasksById = (req, res) => {
    const tasks = db.tasks.find((tasks) => tasks.id == req.params.id);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: "Tasks not found" });
    }
  };
  
  const createTasks = [
    validateTaskInput,
    (req, res) => {
      const newTask = req.body;
      newTask.id = db.tasks.length + 1;
      db.tasks.push(newTask);
      tasksInDB();
      res.status(201).json(newTask);
    }
  ];
  
  const updateTasks = (req, res) => {
    const index = db.tasks.findIndex((task) => task.id == req.params.id);
    if (index !== -1) {
      db.tasks[index] = req.body;
      db.tasks[index].id = req.params.id;
      tasksInDB();
      res.status(200).json(db.tasks[index]);
    } else {
        res.status(404).json({ message: "Tasks not found" });
      }
  };
  
  const deleteTasks = (req, res) => {
    const id = parseInt(req.params.id);
    // Check if the task exists
    const taskExists = db.tasks.some(task => task.id === id);
    if (!taskExists) throw TaskNotFoundException;
    // Filter out the task with the given id
    db.tasks = db.tasks.filter((task) => task.id !== id);
    // Update the database
    tasksInDB();
    // Send a successful response
    res.status(200).json({ message: 'Task deleted successfully' });
  };
  

  module.exports = {
    getAllTasks,
    getTasksById,
    createTasks,
    updateTasks,
    deleteTasks,
  };