const express = require("express");
const { signup,login} = require("../controllers/authController");
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
//router.post('/logout',logout)

module.exports = router;