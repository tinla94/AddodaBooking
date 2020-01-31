const express = require('express');
const router = express.Router();
const { normalizeErrors } = require('../helpers/mongoose');

// Import Models
const Rental = require('../models/rental');
const User = require('../models/user');

const { authMiddleware }= require('../controllers/user');


// @route   GET api/rentals/secret
// @desc    Get token from user info
// @access  Public
router.get(
  '/secret', 
  authMiddleware, 
  function(req, res) {
    res.json({"secret": true});
});


// @route   GET api/v1/rentals
// @desc    Get all rentals from db
// @access  Public
router.get('', function(req, res) {
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};
  
    // Get all rentals without its bookings
    Rental.find(query)
    .select('-bookings')
    .exec(function(err, foundRentals) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (city && foundRentals.length === 0) {
        return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
      }

      return res.json(foundRentals);
    });
  });


// @route   GET api/v1/rentals/manage
// @desc    Get users' rentals list
// @access  Private 
router.get('/manage',  authMiddleware, function(req, res) {
    const user = res.locals.user;

    Rental
      .where({user})
      .populate('bookings')
      .exec(function(err, foundRentals) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json(foundRentals);
    });
});



// @route   GET api/v1/rentals/:id/verify-user
// @desc    Verify user with rental post
// @access  Private
router.get('/:id/verify-user', authMiddleware, function(req, res) {
    const user = res.locals.user;

  
    // Seach rentals assocaite with user
    Rental
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }


      return res.json({status: 'verified'});
      });
  });



// @route   GET api/v1/rentals/:id
// @desc    Get single rental
// @access  Public
router.get('/:id', function(req, res) {
    const rentalId = req.params.id;

    // Displaying single rental
    Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {

    if (err || !foundRental) {
      return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find Rental!'}]});
    }

    return res.json(foundRental);
    });
});


// @route   PATCH api/v1/rentals/:id
// @desc    Edit Rental
// @access  Private
router.patch('/:id', authMiddleware, function(req, res) {
  const rentalData = req.body;
  const user = res.locals.user;

  Rental
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundRental) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }
      // Change data after edit
      foundRental.set(rentalData);
      foundRental.save(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.status(200).send(foundRental);
      });
    });
});



// @route   DELETE api/v1/rentals/:id
// @desc    Delete rental
// @access  Private
router.delete('/:id', authMiddleware, (req,res) => {
    const user = res.locals.user;


    // Search for retanl associate with user and booking
    Rental
    .findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date()}}
    })
    .exec(function(err, foundRental) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      // Check if user is rental post creator
      if (user.id !== foundRental.user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }
      // Return errors if there is a booking
      if (foundRental.bookings.length > 0) {
        return res.status(422).send({errors: [{title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!'}]});
      }
      // Remove rental
      foundRental.remove(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
  
        return res.json({'status': 'deleted'});
      });
    });
});


// @route   POST api/v1/rentals
// @desc    Create rentals
// @access  Private
router.post('', authMiddleware, function(req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
    const user = res.locals.user;
  

    // Define new rental
    const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate});
    rental.user = user;
  
    // Creating rental
    Rental.create(rental, function(err, newRental) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      // Add rentals into user
      User.update({_id: user.id}, { $push: {rentals: newRental}}, function(){});

      return res.json(newRental);
    });
  });


module.exports = router;