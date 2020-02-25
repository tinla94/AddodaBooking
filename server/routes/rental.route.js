const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { check } = require('express-validator');
const { 
  getAllRentals, 
  getRental, 
  createRental, 
  updateRental, 
  deleteRental, 
  checkRentalOwner,
  rentalImageUpload
} = require('../controllers/rental.controller');


// @route   GET api/rentals/all
// @desc    Get all rentals from db
// @access  Public
router.get('/all', getAllRentals);


// @route   GET api/rentals/:id
// @desc    Get single rental
// @access  Public
router.get('/:id', getRental);


// @route   POST api/rentals/create
// @desc    Create a rental
// @access  Private
router.post('/create', [
  requireLogin,
  [
    check('title', 'Tittle is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ]
], createRental);

// @route   POST api/rentals/image-upload
// @desc    Add image for rental
// @access  Private
router.post('/rental-image-upload', requireLogin, rentalImageUpload);


// @route   PATCH api/rentals/edit/:id
// @desc    Get single rental
// @access  Private
router.patch('/edit/:id', requireLogin, updateRental);


// @route   DELETE api/v1/rentals/:id
// @desc    Delete rental
// @access  Private
router.delete('/delete/:id', requireLogin, deleteRental);


// @route   GET api/rentals/:id/verify-user
// @desc    Verify user with rental post
// @access  Private
router.get('/:id/verify-user', requireLogin, checkRentalOwner);

module.exports = router;