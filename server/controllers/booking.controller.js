const moment = require('moment');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SK);

// Importing models
const Booking = require('../models/booking.model');
const Rental = require('../models/rental.model');
const User = require('../models/user.model');
const Payment = require('../models/payment.model');


const CUSTOMER_SHARE = 0.8;


// Create bookings
exports.createBooking = async (req, res) => {
  const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
  const user = req.user;

  try {
    // Define new booking
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

    // find rental
    const foundRental = Rental.findById(rental._id)
      .populate('bookings')
      .populate('user');

    // User cannot book their own post
    if (foundRental.user.id === user._id) {
      return res.status(404).json({ error: 'You cannot create booking on your Rental!' });
    }

    // validate booking and rental
    if (isValidBooking(booking, foundRental)) {
      // if validation is true
      // update booking
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);
      const { payment, err } = await createPayment(booking, foundRental.user, paymentToken);


      if (payment) {
        // update booking payment
        booking.payment = payment;
        booking.save(async (err) => {
          if (err) {
            return res.status(400).send(err);
          }

          // save rental and
          // udpate user model
          foundRental.save();
          await User.update({ _id: user.id }, { $push: { bookings: booking } }, function () { });

          // return booking
          return res.status(200).json(booking);
        });
      } else {
        return res.status(400).send({
          errors: [{ err }]
        });
      }
    } else {
      return res.status(400).json({ error: 'Selected dates are already taken!'});
    }

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Oops! Server Error');
  };
}

// validate booking with rental
const isValidBooking = (proposedBooking, rental) => {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {

    // Check validation of each booking 
    isValid = rental.bookings.every((booking) => {
      // Moment is used convert date to string
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }
  return isValid;
};


// Create payment for booking
const createPayment = async (booking, toUser, token)=> {
  const { user } = booking;
  const tokenId = token.id || token;

  // create charge
  const customer = await stripe.customers.create({
    source: tokenId,
    email: user.email
  });

  if (customer) {
    await User.update({ _id: user.id }, { $set: { stripeCustomerId: customer.id } }, () => { });

    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * CUSTOMER_SHARE
    });

    try {
      const savedPayment = await payment.save();
      return { payment: savedPayment };

    } catch (err) {
      return { err: err.message };
    }

  } else {
    return { err: 'Cannot process Payment!' }
  }
}