const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user.model');

const requireLogin = async (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization').replace('Bearer ', '') || req.header('auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decodedToken = await jwt.verify(token, keys.SECRET)
        const authorizedUser = await User.findById(decodedToken.user.id);

        req.user = authorizedUser;
        next();

    } catch (err) {
        res.status(401).send({ error: 'You need to log into your account!~' });
    }
};


module.exports = requireLogin;