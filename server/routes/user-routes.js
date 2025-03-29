const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user-controllers');
const auth = require('../middleware/auth');

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

module.exports = router; 