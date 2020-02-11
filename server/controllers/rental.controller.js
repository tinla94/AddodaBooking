const User = require('../models/user.model')
const Rental = require('../models/rental.model');
const { validationResult } = require('express-validator');


// Check rental owner
exports.checkRentalOwner = async (req, res) => {
    try {
        const foundrental = await Rental.findById(req.params.id).populate('user');

        // check ids
        if (foundRental.user.id !== req.user.id) {
            return res.status(400).send({
                errors: [{
                    title: 'Unauthorized!', 
                    detail: 'You are not rental owner!'}]});
        }

        // return result 
        return res.status(200).json({status: 'verified'});
    } 
    catch (err) {
        return res.status(400).send({errors: normalizeErrors(err.errors)});
    }
};

// Create Rental
exports.createRental = async (req, res) => {
    const user = req.user;
    const errors = validationResult(req);

    // check errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const rental = await new Rental({ ...req.body, user: user.id });

        // add rentals to User model
        User.update({ _id: user.id }, { $push: { rentals: rental } }, function () { });

        // save rental
        await rental.save((err) => {
            if (err) {
                return res.status(400).send(err);
            }
        });

        // return rental
        res.status(201).json({ msg: 'Rental has been created', rental });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Oops! Server Error');
    };
}

// Update Rental
exports.updateRental = async (req, res) => {
    try {
        const foundRental = await Rental.findById(req.params.id);

        // check if rental is created
        if (!foundRental) {
            return res.status(400).send({ error: 'Rental is not found' })
        }

        // check rental owner
        if (foundRental.user.id !== req.user.id) {
            return res.status(400).send({ error: 'You are not authorized to do this' });
        }

        // update new data with current data
        foundRental.set(req.body);
        foundRental.save(function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            return res.status(201).send({ msg: 'Rental info has been updated', foundRental });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Oops! Server Error');
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
            return res.status(404).json({ error: 'You are not authorized to do this' });
        }

        // check if someone is booking this rental
        if (foundRental.bookings.length > 0) {
            return res.status(404).json({ error: 'Request Denied! This rental is currently booked by customers' });
        }

        // remove rental 
        foundRental.remove(function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            return res.status(200).json({ msg: 'Rental has been deleted' });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Oops! Server Error');
    };
}

// Get all rentals
exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find({}).select('-booking');

        // if no rentals 
        // return error
        if (rentals.length === 0) {
            return res.status(400).json({ error: 'There are no rentals to see' })
        };

        // return all rentals
        return res.status(200).json(rentals);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Oops! Server Error');
    };
}

// Get a rental info
exports.getRental = async (req, res) => {
    try {
        const foundRental = await Rental.findById(req.params.id);

        if (!foundRental) {
            return res.status(401).send({ error: 'Rental is not found' });
        }

        // return rental
        return res.status(200).json(foundRental);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Oops! Server Error');
    };
}

