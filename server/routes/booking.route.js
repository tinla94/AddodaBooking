const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const {
    createBooking,
} = require("../controllers/booking.controller");


// @route   POST api/bookings/create
// @desc    Add bookings to user account
// @access  Private
router.post('/create', requireLogin, createBooking);



module.exports = router;