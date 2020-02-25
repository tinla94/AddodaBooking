const User = require("../models/user.model");
const Rental = require("../models/rental.model");
const Booking = require('../models/booking.model');
const keys = require("../config/keys");
const normalizeErrors = require('../helpers/mongoose-error');
// import aws
const { singleImageUpload } = require('../services/aws/image-upload');
const avatarUpload = singleImageUpload.single('avatarUpload');




// Get user information
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    // check user
    if (!user) {
      return res.status(400).json({
        errors: [{
          title: 'Something wrong...',
          detail: 'Email is not registered'
        }]
      });
    };

    // return user
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message)
    return res.status(500).send({
      errors: [{
        title: 'Something wrong...',
        detail: 'Oops! Internal Server Error'
      }]
    });
  };
}

// Update user 
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // check user
    if (!user) {
      return res.status(400).send({
        errors: [{
          title: 'Something wrong...',
          detail: 'Email is not registered'
        }]
      });
    }

    // update new data with current data
    user.set(req.body);
    user.save((err) => {
      if (err) {
        return res.status(400).send({
          errors: normalizeErrors(err.errors)
        });
      }

      // return user
      return res.status(200).json({ msg: 'Your information has been updated', user });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      errors: [{
        title: 'Something wrong...',
        detail: 'Oops! Internal Server Error'
      }]
    });
  };
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    // check user
    if (!user) return res.status(400).json({
      errors: [{
        title: 'Something wrong...',
        detail: 'User is not found'
      }]
    });

    // return message
    return res.status(200).json({ msg: 'Your account has been deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      errors: [{
        title: 'Something wrong...',
        detail: 'Oops! Internal Server Error'
      }]
    });
  };
}

// Find user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const foundBookings = await Booking.where({ user: req.user.id });

    // return bookings
    return res.status(200).json(foundBookings);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      errors: [{
        title: 'Something wrong...',
        detail: 'Oops! Internal Server Error'
      }]
    });
  };
}

// Find user's rentals
exports.getUserRentals = async (req, res) => {
  try {
    const foundRentals = await Rental.find({ user: req.user.id }).cache({ time: 10 });

    // return rentals
    return res.status(200).json(foundRentals);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      errors: [{
        title: 'Something wrong...',
        detail: 'Oops! Internal Server Error'
      }]
    });
  };
}

// User avatar upload
exports.avatarUpload = (req, res) => {
  try {
    avatarUpload(req, res, async (err) => {
      if (err) {
        return res.status(403).json({
          errors: [{
            title: 'Image Upload Error',
            detail: err.message
          }]
        })
      }

      const user = await User.findById(req.user.id);
      user.avatar = req.file.location;
      
      await user.save();

      // return avatar
      return res.status(200).json( user );
    });
  } catch (e) {
    console.error(err.message);
    return res.status(500).send({
      errors: [{
        title: 'Something wrong...',
        detail: 'Oops! Internal Server Error'
      }]
    });
  }
}