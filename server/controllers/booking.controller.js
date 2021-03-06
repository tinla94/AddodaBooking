const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SK);
const normalizeErrors = require('../helpers/mongoose-error');



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
    const foundRental = await Rental.findById(rental._id)
      .populate('bookings')
      .populate('user');
    console.log(foundRental);

    // User cannot book their own post
    // if (foundRental.user.id === user.id) {
    //   return res.status(405).json({ 
    //       errors: [{
    //         title: 'Action Denied',
    //         detail: 'You cannot create booking on your Rental!'
    //       }]
    //   });
    // };

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
            return res.status(400).send({
              errors: normalizeErrors(err.errors)
            });
          }

          // save rental and
          // udpate user model
          foundRental.save();
          await User.update(
            { _id: user.id }, 
            { $push: { bookings: booking } }, 
            function () { });

          // return booking
          return res.status(200).json(booking);
        });
      } else {
        return res.status(400).send({
          errors: [{ err }]
        });
      }
    } else {
      return res.status(400).json({ 
        errors: [{
          title: 'Something wrong...',
          detail: 'Selected dates are already taken!'
        }]
      });
    }

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