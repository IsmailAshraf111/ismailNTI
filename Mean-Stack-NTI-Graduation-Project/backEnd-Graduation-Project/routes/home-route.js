// home-route.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const homeController = require('../controllers/home-controllers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/', homeController.getHomeData);

router.put('/:id', upload.single('img'), homeController.updateMetaData);

module.exports = router;
