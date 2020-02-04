const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getUserRentals,uploadProfileImage } = require('../controllers/user.controller');
const requireLogin = require('../middlewares/requireLogin');


// @route   GET api/users/user-profile
// @desc    Get user info
// @access  Private
router.get('/user-profile', requireLogin, getUser);


// @route   GET api/users/rentals-manage
// @desc    Get user rentals list
// @access  Private
router.get('/rentals-manage', requireLogin, getUserRentals);


// @route   Patch api/users/user-profile/edit
// @desc    Edit user info
// @access  Private
router.patch('/user-profile/edit', requireLogin, updateUser);


// @route   Patch api/users/user-profile/delete
// @desc    Delete user info
// @access  Private
router.delete('/user-profile/delete', requireLogin, deleteUser);


// @route   POST api/users/image-upload
// @desc    Upload user image
// @access  Private
router.post( '/image-upload', requireLogin, uploadProfileImage);


module.exports = router;