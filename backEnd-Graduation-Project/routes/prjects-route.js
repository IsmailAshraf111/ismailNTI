const express = require('express');
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/prjects-controllers');

const router = express.Router();
router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
