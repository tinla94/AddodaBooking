const router = require('./router');
const { getUser, uploadUserImage } = require('../controllers/user.controller');
const { authMiddleware } = require('../controllers/auth.controller');


// @route   GET api/users/:id
// @desc    Get user info
// @access  Private
router.get('/:id', authMiddleware, getUser);

// @route   POST api/users/image-upload/:id
// @desc    Upload user image
// @access  Private
router.post( '/image-upload', authMiddleware, uploadUserImage );

module.exports = router;