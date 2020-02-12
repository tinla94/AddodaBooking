const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SK);
const normalizeErrors = require('../helpers/mongoose-error');
const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const Rental = require('../models/rental.model');
const User = require('../models/user.model');


// Find pending payment
exports.getPendingPayment = async (req, res) => {
  try {
    // looking for payment
    const pendingPayment = await Payment
      .where({ toUser: req.user })
      .populate({
        path: 'booking',
        populate: { path: 'rental' }
      })
      .populate('fromUser');

    // check payment
    if (!pendingPayment) {
      return res.status(400).json({
        errors: [{
          title: 'Something wrong',
          detail: 'Payment is not found'
        }]
      });
    }

    // return payment
    return res.status(200).json(pendingPayment);

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



// Accpeting Payment
exports.confirmPayment = async (req, res) => {
  const payment = req.body;
  const user = req.user;

  try {
    const foundPayment = await Payment.findById(payment._id)
      .populate('toUser')
      .populate('booking');

    if (!foundPayment) {
      return res.status(400).json({
        errors: [{
          title: 'Something wrong...',
          detail: 'Payment is not found'
        }]
      });
    }

    // Find valid payment 
    if (foundPayment.status === 'pending' && user._id === foundPayment.toUser.id) {
      // Confirming booking
      const booking = foundPayment.booking;

      const charge = await stripe.charges.create({
        amount: booking.totalPrice * 100,
        currency: 'usd',
        customer: payment.fromStripeCustomerId
      })

      // if booking is charged
      // update your booking
      if (charge) {
        await Booking.update({ _id: booking }, { status: 'active' }, function () { });

        foundPayment.charge = charge;
        foundPayment.status = 'paid';

        foundPayment.save(async (err) => {
          if (err) {
            return res.status(400).send({
              errors: normalizeErrors(err.errors)
            });
          }


          await User.update(
            { _id: foundPayment.toUser },
            { $inc: { revenue: foundPayment.amount } }, (err, user) => {
              if (err) {
                return res.status(400).send({
                  errors: normalizeErrors(err.errors)
                });
              }

              return res.status(200).json('Payment has been accepted');
            })
        })
      }
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


// Declining Payment
exports.declinePayment = async (req, res) => {
  const payment = req.body;
  const { booking } = payment;

  try {
    const foundBooking = await Booking.findOneAndDelete({ id: booking._id });

    if (!foundBooking) {
      return res.status(400).json({
        errors: [{
          title: 'Something wrong...',
          detail: "Booking is not found"
        }]
      });
    }

    // Update payment and booking
    await Payment.update({ _id: payment._id }, { status: 'declined' }, function () { });
    await Rental.update({ _id: booking.rental }, { $pull: { bookings: booking._id } }, () => { });

    return res.status(200).json('Payment has been declined');
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