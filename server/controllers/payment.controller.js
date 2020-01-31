const Payment = require('../models/payment');
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

const { normalizeErrors } = require('../helpers/mongoose');

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripe_sk);



// Look at payments pending
exports.getPendingPayments = async (req, res) => {
  const user = res.locals.user; // get user info

  try {  
    // looking for payment
    const foundPayment = await Payment
    .where({ toUser: user })
    .populate({
      path: 'booking',
      populate: {path: 'rental'}
    })
    .populate('fromUser');

    // check payment
    if (!foundPayment) {
      return res.status(400).send({
        errors: [{
          title: 'Invalid data',
          detail: 'Payment is not found'
        }]
      });
    } 

    // return payment
    return res.status(200).json(foundPayment);

  } catch (err) {
    return res.status(400).send({errors: normalizeErrors(err.errors)});
  }
}



// Coonfirming payments before charging and booking
exports.confirmPayment = async (req, res) => {
  const payment = req.body;
  const user = res.locals.user;

  Payment.findById(payment._id)
    .populate('toUser')
    .populate('booking')
    .exec(async function(err, foundPayment) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      // Find valid payment 
      if (foundPayment.status === 'pending' && user.id === foundPayment.toUser.id) {
        // Confirming booking
        const booking = foundPayment.booking;

        const charge = await stripe.charges.create({
          amount: booking.totalPrice * 100,
          currency: 'usd',
          customer: payment.fromStripeCustomerId
        })

        if (charge) {
          // Updating booking
          Booking.update({_id: booking}, { status: 'active'}, function(){});

          foundPayment.charge = charge;
          foundPayment.status = 'paid';

          foundPayment.save(function(err) {
            if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }


            User.update({_id: foundPayment.toUser}, { $inc: {revenue: foundPayment.amount}}, function(err, user){
              if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
              }

              return res.json({status: 'paid'});
            })
          })
        }
      }
    });
}


// Declining payments
exports.declinePayment = function(req, res) {
  const payment = req.body;
  const { booking } = payment;
  // Cancel booking once payment is cancelled
  Booking.deleteOne({id: booking._id}, (err, deletedBooking) => {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    Payment.update({_id: payment._id}, {status: 'declined'}, function() {});
    Rental.update({_id: booking.rental}, {$pull: {bookings: booking._id}}, () => {});

    return res.json({status: 'deleted'});

  })
}