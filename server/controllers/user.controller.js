const User = require("../models/user.model");
const Rental = require("../models/rental.model");
const keys = require("../config/keys");
const normalizeErrors = require("../helpers/mongoose");
const { profileImageUpload } = require('../services/image-upload');


// Get user information
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    // check user
    if (!user) {
      return res.status(404).send(`User is not found!`);
    }

    // return user
    return req.status(200).json(user);
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
      return res.status(404).send(`User is not found!`);
    }
    // update new data with current data
    user.set(req.body);
    user.save((err) => {
      if(err) {
        return res.status(400).send(err);
      }

      // return user
      return res.status(200).json(user);
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    // return message
    return res.status(200).json('User is successfully deleted')
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
        return res.status(400).send({
          errors:
            [{
              title: 'Image Upload Error',
              detail: err.message
            }
            ]
        });
      }
  
      // if file not found
      if (req.file === undefined) {
        console.log(`Error: No File Selected`);
        return res.status(400).send({
          errors: [{
            title: 'Image Upload Error',
            detail: `No File Selected`
          }]
        });
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

// Find user's rentals
exports.getUserRentals = async (req, res) => {
  try {
      const foundRentals = await User.findById(req.user._id).select('rentals');

      // if there is no rental
      // return error
      if (foundRentals.length === 0) {
          return res.status(400).send('Invalid Data! No rentals available');
      }

      // return rentals
      return res.status(200).send(foundRentals);
  } catch (err) {
      console.error(err.message);
      return res.status(500).send('Oops! Server Error');
  };
}