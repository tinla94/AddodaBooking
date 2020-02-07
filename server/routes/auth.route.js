const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signin, signup, signout } = require('../controllers/auth.controller');
const requireLogin = require('../middlewares/requireLogin');


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
        check('firstname', 'First name is required').not().isEmpty(),
        check('lastname', 'Last name is required').not().isEmpty(),
    ],
    signup);

// @route   POST api/auth/signout
// @desc    Sign out user
// @access  Private
router.post('/signout', requireLogin, signout);

module.exports = router;