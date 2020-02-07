const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const { getPendingPayment, confirmPayment, declinePayment } = require('../controllers/payment.controller');

// @route   GET api/payments/pending
// @desc    Get payment for booking
// @access  Private
router.get('/pending', requireLogin, getPendingPayment);

// @route   POST api/payments/accept
// @desc    Confirm payment for booking
// @access  Private
router.post('/accept', requireLogin, confirmPayment);

// @route   POST api/payments/decline
// @desc    Decline payment for booking
// @access  Private
router.post('/decline', requireLogin, declinePayment);



module.exports = router;