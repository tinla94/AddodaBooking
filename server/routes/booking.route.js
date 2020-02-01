const router = require('./router');
const { authMiddleware } = require('../controllers/auth.controller');
const {
    createBooking,
    getUserBookings
} = require("../controllers/booking");


// @route   POST api/bookings
// @desc    Add bookings to user account
// @access  Private
router.post('', authMiddleware, createBooking);


// @route   GET api/bookings/manage
// @desc    Get all users' bookings
// @access  Private
router.get('/manage', authMiddleware, getUserBookings);


module.exports = router;