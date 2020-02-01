const User = require("../models/user");
const keys = require("../config/keys");
const normalizeErrors = require("../helpers/mongoose");
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

// Get user information
exports.getUser = async (req, res) => {
  const requestedUserId = req.params.id;
  const user = res.locals.user;
  const foundUser = User.findById(requestedUserId);

  // check user 
  if (!foundUser) {
    return res.status(400).send({
      errors: [{
        title: 'Invalid data',
        detail: 'Account is not registered yet'
      }]
    });
  };

  try {
    if (requestedUserId === user.id) {
      return res.status(200).json(foundUser);
    } else {
      foundUser
      .select("-revenue -stripeCustomerId -password")
      .exec(function(err, user) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.status(200).json(user);
      });
    }
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
};

// Update user information

// Delete user

// Upload user image
exports.uploadUserImage = (req, res) => {
  singleUpload(req, res, function(err) {
      if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
      }

      return res.status(200).json({ 'userImageUrl': req.file.location });
  });
}



