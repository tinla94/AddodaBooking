const { normalizeErrors } = require('../helpers/mongoose-error');


// importing models
const User = require('../models/user')
const Rental = require('../models/rental');


// craete rental
const createRental = async (req, res) => {
    const user = res.locals.user;

    try {
        // create new rental
        const rental = await new Rental(req.body);
        rental.user = user;

        // update user rentals
        await User.update({ _id: user.id }, { $push: { rentals: rental } }, function () { });

        // save rental
        await rental.save();

    } catch (err) {
        return res.status(400).send({ errors: normalizeErrors(err.errors) });
    }
}

// edit rental
const editRental = async (req, res) => {
    const rentalData = req.body;
    const user = res.locals.user;

    try {
        const foundRental = await Rental.findById(req.params.id).populate('user').exec();

        // check if rental is created
        if (!foundRental) {
            return rs.status(400).send({
                errors: [{
                    title: 'Invalid Rental data',
                    details: 'Retanl is not found'
                }]
            })
        }

        // check rental owner
        if (foundRental.user.id !== user.id) {
            return res.status(400).send({
                errors: [{
                    title: 'Invalid User!',
                    detail: 'You are not rental owner!'
                }]
            });
        }

        // update new data with current data
        foundRental.set(rentalData);
        foundRental.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.status(200).send(foundRental);
        });

    } catch (err) {
        return res.status(400).send({ errors: normalizeErrors(err.errors) });
    }
}

// delete rental
const deleteRental = async (req, res) => {
    const user = res.locals.user;

    try {
        const foundRental = await Rental
            .findById(req.params.id)
            .populate('user', '_id')
            .populate({
                path: 'bookings',
                select: 'startAt',
                match: { startAt: { $gt: new Date() } }
            })
            .exec();

        // check user owner
        if (user.id !== foundRental.user.id) {
            return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not rental owner!' }] });
        }

        // check if someone is booking this rental
        if (foundRental.bookings.length > 0) {
            return res.status(422).send({ errors: [{ title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!' }] });
        }

        // remove rental 
        foundRental.remove(function (err) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json({ 'status': 'deleted' });
        });
    } catch (err) {
        return res.status(400).send({ errors: normalizeErrors(err.errors) });
    }
}

// get all rentals
const getAllRentals = async (req, res) => {
    // Get all rentals 
    // without selecing bookings
    const rentals = await Rental.find({}).select('-booking');

    // if no rentals found
    if (rentals.length === 0) {
        return res.status(400).send({
            errors: [{
                title: 'Invalid data',
                details: 'There are no rentals to see'
            }]
        });
    };

    // return rentals
    return res.status(200).send(rentals);
}

// get single rental
const getRental = async (req, res) => {
    try {
        const foundRental = await (await Rental.findById( req.params.id).populate('user', 'username -_id')).populated('bookings', 'startAt endAt -_id').exec();

        if (!foundRental) {
            return rs.status(400).send({
                errors: [{
                    title: 'Invalid Rental data',
                    details: 'Retanl is not found'
                }]
            })
        }

        // return rental
        return res.status(200).send(foundRental);
    } catch (err) {
        return res.status(400).send({
            errors: normalizeErrors(err.messages)
        })
    }
}

// get lists of user rentals
const getUserRentals = async (req, res) => {
    const user = res.locals.user;

    try {
        const foundRentals = await Rental.where({ user }).populate('bookings');

        if (foundRentals.length === 0) {
            return res.status(400).send({
                errors: [{
                    title: 'Invalid data',
                    details: 'There are no rentals to see'
                }]
            });
        }

        // return rentals
        return res.status(200).send(foundRentals);
    } catch (err) {
        return res.status(400).send({
            errors: normalizeErrors(err.messages)
        })
    }
}