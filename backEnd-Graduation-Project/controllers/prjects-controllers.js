const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { validationResult } = require('express-validator');
const projectsModels = require('../models/prjects-model');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Create
exports.createProject = [upload.single('imgUrl'), async (req, res) => {
  const { tech, title, description, btnOneTitle, btnOneUrl, btnTwoTitle, btnTwoUrl } = req.body;
  // const imgUrl = req.file ? `/uploads/${req.file.filename}` : '';
  let imgUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imgUrl;

  
  try {
    const newProject = new projectsModels({ tech, title, description, btnOneTitle, btnOneUrl, btnTwoTitle, btnTwoUrl, imgUrl });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}];

// Read
exports.getProjects = async (req, res) => {
  try {
    const projects = await projectsModels.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProject = [upload.single('imgUrl'), async (req, res) => {
  const { id } = req.params;
  const { tech, title, description, btnOneTitle, btnOneUrl, btnTwoTitle, btnTwoUrl } = req.body;
  let imgUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imgUrl;

  try {
    const updatedProject = await projectsModels.findByIdAndUpdate(id, { tech, title, description, btnOneTitle, btnOneUrl, btnTwoTitle, btnTwoUrl, imgUrl }, { new: true });
    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}];

// Delete
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await projectsModels.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });

    if (deletedProject.imgUrl) {
      const filePath = path.join(__dirname, '../uploads', path.basename(deletedProject.imgUrl));
      fs.unlinkSync(filePath);
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
