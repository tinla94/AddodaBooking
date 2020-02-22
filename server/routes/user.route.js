const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getUserRentals, getUserBookings, avatarUpload} = require('../controllers/user.controller');
const requireLogin = require('../middlewares/requireLogin');


// @route   GET api/users/profile
// @desc    Get user profile information
// @access  Private
router.get('/profile', requireLogin, getUser);


// @route   GET api/users/rentals-manage
// @desc    Get user rentals list
// @access  Private
router.get('/rentals-manage', requireLogin, getUserRentals);

// @route   GET api/users/bookings-manage
// @desc    Get user bookings list
// @access  Private
router.get('/bookings-manage', requireLogin, getUserBookings);


// @route   Patch api/users/profile/edit
// @desc    Edit user info
// @access  Private
router.patch('/profile/edit', requireLogin, updateUser);


// @route   Patch api/users/profile/delete
// @desc    Delete user info
// @access  Private
router.delete('/profile/delete', requireLogin, deleteUser);


// @route   POST api/users/profile/image-upload
// @desc    Upload user image
// @access  Private
router.post( '/profile/avatar-upload', requireLogin, avatarUpload);


module.exports = router;