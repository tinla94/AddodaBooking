const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  stripeCustomerId: String,
  revenue: Number,
  rentals: [{
    type: Schema.Types.ObjectId, 
    ref: 'Rental'
  }],
  bookings: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Booking' 
  }]
});




// Comparing passwords
// if you use arrow structure bcrpyt wont work
userSchema.methods.hasSamePassword = function(requestedPassword) {
  // compareSync is used to compare input password and password in db
  return bcrypt.compareSync(requestedPassword, this.password);
}



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