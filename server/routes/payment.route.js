const router = require('./router');

const { authMiddleware }= require('../controllers/user');
const PaymentController = require('../controllers/payment');

router.get(
    '', 
    authMiddleware, 
    PaymentController.getPendingPayments);

router.post(
    '/accept', 
    authMiddleware, 
    PaymentController.confirmPayment
);
router.post(
    '/decline', 
    authMiddleware, 
    PaymentController.declinePayment
);

module.exports = router;