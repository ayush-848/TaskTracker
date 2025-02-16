const express = require("express");
const multer=require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { signup,login} = require("../controllers/authController");
const router = express.Router();

router.post("/register", upload.single("profilePhoto"), signup);
router.post("/login", login);
//router.post('/logout',logout)

module.exports = router;