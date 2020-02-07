const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { check } = require('express-validator');
const { getAllRentals, getRental, createRental, updateRental, deleteRental } = require('../controllers/rental.controller');


// @route   GET api/rentals/all
// @desc    Get all rentals from db
// @access  Public
router.get('/all', getAllRentals);


// @route   GET api/rentals/:id
// @desc    Get single rental
// @access  Public
router.get('/:id', getRental);


// @route   POST api/rentals/edit/:id
// @desc    Get single rental
// @access  Private
router.post('/create', [
  requireLogin,
  [
    check('title', 'Tittle is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ]
], createRental);


// @route   PATCH api/rentals/edit/:id
// @desc    Get single rental
// @access  Private
router.patch('/edit/:id', requireLogin, updateRental);


// @route   DELETE api/v1/rentals/:id
// @desc    Delete rental
// @access  Private
router.delete('/delete/:id', requireLogin, deleteRental);


// @route   GET api/v1/rentals/:id/verify-user
// @desc    Verify user with rental post
// @access  Private
// router.get('/:id/verify-user', authMiddleware, function(req, res) {
//     const user = res.locals.user;

  
//     // Seach rentals assocaite with user
//     Rental
//     .findById(req.params.id)
//     .populate('user')
//     .exec(function(err, foundRental) {
//       if (err) {
//         return res.status(422).send({errors: normalizeErrors(err.errors)});
//       }

//       if (foundRental.user.id !== user.id) {
//         return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
//       }


//       return res.json({status: 'verified'});
//       });
//   });



module.exports = router;