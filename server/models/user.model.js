const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters']
  },
  lastname: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters']
  },
  username: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters']
  },
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
  },
  avartar: {
    type: String,
    trim: true
  },
  stripeCustomerId: String,
  revenue: Number,
  joined: {
    type: Date,
    default: Date.now
  },
  rentals: [{
    type: Schema.Types.ObjectId, 
    ref: 'Rental'
  }],
  bookings: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Booking' 
  }]
});

// Save data 
userSchema.pre('save', function(next) {
  const user = this;
  // Hashing password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
  });
});

module.exports = mongoose.model('User', userSchema );
