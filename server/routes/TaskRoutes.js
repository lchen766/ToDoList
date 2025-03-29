import express from 'express';
import { check } from 'express-validator';
import taskController from '../controllers/TaskControllers.js';
import auth from '../middleware/Auth.js';

const router = express.Router();

// Get User's Tasks: GET /api/tasks
router.get('/', auth, taskController.getTasks);

// Add Task: POST /api/tasks
router.post('/', auth, taskController.createTask);

// Update Task: PUT /api/tasks/:id
router.put('/:id', auth, taskController.updateTask);

// Delete Task: DELETE /api/tasks/:id
router.delete('/:id', auth, taskController.deleteTask);

export default router;