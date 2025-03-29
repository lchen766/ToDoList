import express from 'express';
import { check } from 'express-validator';
import userController from '../controllers/user-controllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// User Registration: POST /api/register
router.post(
  '/register',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
  ],
  userController.signup
);

// User Login: POST /api/login
router.post('/login', 
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
  ], userController.login
);

// Validate Token: GET /api/validate
router.get('/validate', auth, userController.validateToken);

export default router; 