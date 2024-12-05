const express = require("express");
const router = express.Router();
const userController = require("../controllers/adminLoginControll");
const auth = require("../config/auth");

router.post("/create", userController.createUser);

router.post("/login", userController.login);

router.get("/", auth.authMiddleware, userController.getUsers);

module.exports = router;

