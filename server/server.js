// import db
require('./db/mongoose');
// packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
const { createError } = require('http-errors');

// keys
const keys = require('./config/keys');
// app
const app = express();

// import routes
const authRoutes = require('./routes/auth.route'),
    rentalRoutes = require('./routes/rental.route'),
    userRoutes = require('./routes/user.route'),
    bookingRoutes = require('./routes/booking.route'),
    paymentRoutes = require('./routes/payment.route');



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.COOKIE_SECRET]
}));
app.use(passport.initialize());
app.use(passport.session());


// Setting up routes
app.use('/api/auth', authRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

// Production build
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
    app.use(express.static('client/build'));
  
    app.get('*', function(req, res) {
      res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  // render error page 
  res.status(err.status || 500);
  res.json({ error: err });

  next();
});


module.exports = app;