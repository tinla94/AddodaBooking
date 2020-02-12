const User = require('../models/user.model')
const Rental = require('../models/rental.model');
const { validationResult } = require('express-validator');
const normalizeErrors = require('../helpers/mongoose-error');

// Check rental owner
exports.checkRentalOwner = async (req, res) => {
    try {
        const foundrental = await Rental.findById(req.params.id).populate('user');

        // check ids
        if (foundRental.user.id !== req.user.id) {
            return res.status(401).send({
                errors: [{
                    title: 'Unauthorized!',
                    detail: 'You are not rental owner!'
                }]
            });
        }

        // return result 
        return res.status(200).json({ status: 'verified' });
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({
            errors: [{
                title: 'Something wrong...',
                detail: 'Oops! Internal Server Error'
            }]
        });
    }
};

// Create Rental
exports.createRental = async (req, res) => {
    const user = req.user;
    const errors = validationResult(req);

    // check errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const rental = await new Rental({ ...req.body, user: user.id });

        // add rentals to User model
        User.update({ _id: user.id }, { $push: { rentals: rental } }, function () { });

        // save rental
        await rental.save((err) => {
            if (err) {
                return res.status(400).send({
                    errors: normalizeErrors(err.errors)
                });
            }
        });

        // return rental
        res.status(201).json(rental);
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

// Update Rental
exports.updateRental = async (req, res) => {
    try {
        const foundRental = await Rental.findById(req.params.id);

        // check if rental is created
        if (!foundRental) {
            return res.status(400).send({
                errors: [{
                    title: 'Something wrong...',
                    detail: 'Rental is not found'
                }]
            })
        }

        // check rental owner
        if (foundRental.user.id !== req.user.id) {
            return res.status(401).json({
                errors: [{
                    title: 'Unauthorized Access',
                    details: 'You are not authorized to do this'
                }]
            });
        }

        // update new data with current data
        foundRental.set(req.body);
        foundRental.save(function (err) {
            if (err) {
                return res.status(400).send({
                    errors: normalizeErrors(err.errors)
                });
            }

            return res.status(201).send(foundRental);
        });
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

// Delete rental
exports.deleteRental = async (req, res) => {
    try {
        const foundRental = await Rental
            .findById(req.params.id)
            .populate('user', '_id')
            .populate({
                path: 'bookings',
                select: 'startAt',
                match: { startAt: { $gt: new Date() } }
            });

        // check if user own the rental post
        if (req.user._id !== foundRental.user.id) {
            return res.status(401).json({
                errors: [{
                    title: 'Unauthorized Access',
                    details: 'You are not authorized to do this'
                }]
            });
        }

        // check if someone is booking this rental
        if (foundRental.bookings.length > 0) {
            return res.status(404).json({
                errors: [{
                    title: 'Action Denied',
                    detail: 'This rental is currently booked by customers'
                }]
            });
        }

        // remove rental 
        foundRental.remove(function (err) {
            if (err) {
                return res.status(400).send({
                    errors: normalizeErrors(err.errors)
                });
            }

            return res.status(200).json('Rental has been deleted');
        });
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

// Get all rentals
exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find({}).select('-booking');

        // if no rentals 
        // return error
        if (rentals.length === 0) {
            return res.status(400).json({
                errors: [{
                    title: 'Something wrong...',
                    detail: 'No rentals found'
                }]
            });
        };

        // return all rentals
        return res.status(200).json(rentals);
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

// Get a rental info
exports.getRental = async (req, res) => {
    try {
        const foundRental = await Rental.findById(req.params.id);

        if (!foundRental) {
            return res.status(400).send({
                errors: [{
                    title: 'Something wrong...',
                    detail: 'Rental is not found'
                }]
            });
        }

        // return rental
        return res.status(200).json(foundRental);
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

