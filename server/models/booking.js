const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: { 
    type: Date, 
    required: 'Please enter start date'
  },
  endAt: { 
    type: Date, 
    required: 'Please enter end date'
  },
  totalPrice: Number,
  days: Number,
  guests: {
    type: Number,
    default: 2
  },
  children: {
    type: Number,
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  rental: { 
    type: Schema.Types.ObjectId, 
    ref: 'Rental'
  },
  payment: { 
    type: Schema.Types.ObjectId, 
    ref: 'Payment'
  },
  status: { 
    type: String, 
    default: 'pending'
  }
});


module.exports = mongoose.model('Booking', bookingSchema );
