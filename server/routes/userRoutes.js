const express = require("express");
const { createTask} = require("../controllers/taskController");
const router = express.Router();
const authenticated=require('../middlewares/authenticated')

router.post("/create-task",authenticated, createTask);
//router.post("/login", login);
//router.post('/logout',logout)

module.exports = router;