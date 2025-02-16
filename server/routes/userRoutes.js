const express = require("express");
const { createTask,getUserTasks,getTaskInfo,updateTask} = require("../controllers/taskController");
const router = express.Router();
const authenticated=require('../middlewares/authenticated')

router.post("/create-task",authenticated, createTask);
router.get("/tasks/user", authenticated, getUserTasks);
router.get("/tasks/user/:id", authenticated, getTaskInfo);
router.patch("/tasks/user/edit/:id", authenticated, updateTask);

module.exports = router;