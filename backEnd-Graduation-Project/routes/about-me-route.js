const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about-me-controllers");



router.post("/", aboutController.createAbout);

router.get("/", aboutController.getAbout);

router.put("/:id", aboutController.updateAbout);
module.exports = router;
