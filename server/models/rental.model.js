const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    max: [128, 'Maximum is 128 characters.']
  },
  address: { 
    type: String, 
    required: true, 
    min: [4, 'Minimum is 4 characters']
  },
  city: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  country: {
    type: String,
    required: true,
    lowercase: true 
  },
  category: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  images: [{ 
    type: String, 
    required: true 
  }],
  bedrooms: {
    type: Number,
    default: 0,
    min: [1, `Minimum room is 1`],
    max: [100, `Maximum rooms are 100`]
  },
  shared: {
    type: Boolean, 
    default: false
  },
  description: { 
    type: String, 
    required: true,
    min: [20, 'Please write 20 - 100 words about the place']
  },
  dailyRate: {
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
  bookings: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Booking' 
  }]
});


module.exports = mongoose.model('Rental', rentalSchema );
