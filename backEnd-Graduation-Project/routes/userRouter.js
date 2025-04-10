const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControll");
const auth = require("../config/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/", auth.authMiddleware, userController.getUsers);

// router.use(auth.authMiddleware)

// router.get("/profile", userController.getUserProfile);
// router.put("/profile", userController.updateProfile);


// router.use(auth.adminMiddleware);

// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);


module.exports = router;

