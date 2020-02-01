const router = require('./router');
const { signin, signup } = require('../controllers/auth.controller');


// @route   POST api/auth/signin
// @desc    Sign in user
// @access  Public
router.post('/signin', signin);


// @route   POST api/auth/signup
// @desc    Sign up user
// @access  Public
router.post('/signup', signup);

// @route   POST api/auth/signout
// @desc    Sign out user
// @access  Private

module.exports = router;