const path = require("path");
const dbPath = path.join(__dirname, "../../data/db.json");
let db = require(dbPath);

const checkTaskExists = (req, res, next) => { 
    const task = db.tasks.find(t => t.id === parseInt(req.params.id));  
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });  
    }
    req.task = task;  
    next();  
};

module.exports = checkTaskExists