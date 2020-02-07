const User = require("../models/user.model");
const Rental = require("../models/rental.model");
const Booking = require('../models/booking.model');
const keys = require("../config/keys");
const { profileImageUpload } = require('../services/image-upload');


// Get user information
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    // check user
    if (!user) {
      return res.status(404).json({ error: 'Email is not registered' });
    }

    // return user
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// Update user 
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // check user
    if (!user) {
      return res.status(404).send({ error: 'Email is not registered' });
    }

    // update new data with current data
    user.set(req.body);
    user.save((err) => {
      if(err) {
        return res.status(400).send({ msg: err });
      }

      // return user
      return res.status(200).json({ msg: 'Your information has been updated', user });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    // check user
    if(!user) return res.status(400).json({ error: 'User is not found'});
    
    // return message
    return res.status(200).json({ msg: 'Your account has been deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// Profile Image Upload
exports.uploadProfileImage = (req, res) => {
  try {
    profileImageUpload(req, res, (err) => {
      // check error
      if (err) {
        return res.status(400).send(err);
      }
  
      // if file not found
      if (req.file === undefined) {
        return res.status(400).json({ error: 'No File is being selected' });
      }
  
      // return image
      return res.status(200).json({
        'Image Key': req.file.key,
        'Image Location': req.file.location
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// Find user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const foundBookings = await Booking.where({ user: req.user.id});

    if(foundBookings.length === 0) {
      return res.status(400).json({ error: 'You have 0 bookings on your list'});
    }

    // return bookings
    return res.status(200).json(foundBookings);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// Find user's rentals
exports.getUserRentals = async (req, res) => {
  try {
      const foundRentals = await Rental.where({ user: req.user.id });
      console.log(foundRentals);

      if (foundRentals.length === 0) {
          console.log('0 rentals')
          return res.status(400).json({ error: 'You have 0 rentals on your list' });
      }

      // return rentals
      return res.status(200).json({ msg: 'Hello World' });
  } catch (err) {
      console.error(err.message);
      return res.status(500).send('Oops! Server Error');
  };
}