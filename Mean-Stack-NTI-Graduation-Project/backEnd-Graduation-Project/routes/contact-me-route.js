const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact-me-controllers");

router.get("/", contactController.getContact);
router.post("/", contactController.createContact);
router.put("/:id", contactController.updateContact);

module.exports = router;
