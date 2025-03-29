const express = require('express');
const { check } = require('express-validator');
const taskController = require('../controllers/task-controllers');
const auth = require('../middleware/auth');

const router = express.Router();

// Get User's Tasks: GET /api/tasks
router.get('/', auth, taskController.getTasks);

// Add Task: POST /api/tasks
router.post('/', auth, taskController.createTask);

// Update Task: PUT /api/tasks/:id
router.put('/:id', auth, taskController.updateTask);

// Delete Task: DELETE /api/tasks/:id
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 