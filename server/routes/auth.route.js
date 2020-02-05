const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const { signin, signup } = require('../controllers/auth.controller');


// @route   POST api/auth/signin
// @desc    Sign in user
// @access  Public
router.post(
    '/signin', 
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password is required').exists()
    ],
    signin);


// @route   POST api/auth/signup
// @desc    Sign up user
// @access  Public
router.post(
    '/signup', 
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Email is required').not().isEmpty(),
        check('username', 'Username is required').not().isEmpty()
    ],
    signup);

// @route   POST api/auth/signout
// @desc    Sign out user
// @access  Private

module.exports = router;