const express = require('express')
const app = express()
const tasksRoutes = require("./src/routes/taskRoutes")
const validation = require("./src/middleware/validateTaskInput")
// const errorHandler = require('./src/middleware/taskNotFound')

app.use(express.json());
// app.use(errorHandler);
app.use(validation);
app.use("/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});