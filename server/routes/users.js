const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');


// @route   GET api/users/auth
// @desc    Log user in
// @access  Public
router.post(
    '/auth', 
    UserController.auth
);


// @route   GET api/users/register
// @desc    Registering User
// @access  Public
router.post(
    '/register', 
    UserController.register
);


// @route   GET api/users/:id
// @desc    Get user info
// @access  Public
router.get(
    '/:id', 
    UserController.authMiddleware, 
    UserController.getUser
);


module.exports = router;