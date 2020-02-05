const router = require('./router');
const { authMiddleware } = require('../controllers/auth.controller');
const {
    createBooking,
    getUserBookings
} = require("../controllers/booking");


// @route   POST api/bookings/create
// @desc    Add bookings to user account
// @access  Private
router.post('/create', authMiddleware, createBooking);



module.exports = router;