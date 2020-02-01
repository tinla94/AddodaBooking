const Payment = require('../models/payment');
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

const { normalizeErrors } = require('../helpers/mongoose');

const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripe_sk);



// Look at payments pending
exports.getPendingPayment = async (req, res) => {
  const user = res.locals.user; // get user info

  try {  
    // looking for payment
    const pendingPayment = await Payment
    .where({ toUser: user })
    .populate({
      path: 'booking',
      populate: {path: 'rental'}
    })
    .populate('fromUser');

    // check payment
    if (!pendingPayment) {
      return res.status(400).send({
        errors: [{
          title: 'Invalid data',
          detail: 'Payment is not found'
        }]
      });
    } 

    // return payment
    return res.status(200).json(pendingPayment);

  } catch (err) {
    return res.status(400).send({errors: normalizeErrors(err.errors)});
  }
}



// Coonfirming payments before charging and booking
exports.confirmPayment = async (req, res) => {
  const payment = req.body;
  const user = res.locals.user;

  try {
    const foundPayment = await Payment.findById(payment._id)
    .populate('toUser')
    .populate('booking');

    if(!foundPayment) {
      return res.status(400).send({
        errors: [{
          title: 'Invalid data',
          detail: 'Payment is not found'
        }]
      })
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

      // if booking is charged
      // update your booking
      if (charge) {
        await Booking.update({_id: booking}, { status: 'active'}, function(){});

        foundPayment.charge = charge;
        foundPayment.status = 'paid';

        foundPayment.save(err =>  {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }


          await User.update(
            { _id: foundPayment.toUser }, 
            { $inc: {revenue: foundPayment.amount} }, (err, user) => {
            if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json({ status: 'paid' });
          })
        })
      }
    }
  } catch(err) {
    return res.status(422).send({errors: normalizeErrors(err.errors)});
  }
}


// Declining payments
exports.declinePayment = async (req, res) => {
  const payment = req.body;
  const { booking } = payment;

  try {
    const foundBooking = await Booking.findOneAndDelete({id: booking._id}); 

    if(!foundBooking) {
      return res.status(400).send({
        errors: [{
              title: "Invalid Data",
              detail: "Booking is not found"
          }]
      })
    }

    // Update payment and booking
    await Payment.update({ _id: payment._id }, {status: 'declined'}, function() {});
    await Rental.update({ _id: booking.rental }, {$pull: {bookings: booking._id}}, () => {});

    return res.status(200).json({ status: 'deleted' });
  } catch (err) {
    return res.status(400).send({errors: normalizeErrors(err.errors)});
  }
}