const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user.model');

const requireLogin = async (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token') || req.header('Authorization').replace('Bearer ', '');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decodedToken = jwt.verify(token, keys.SECRET);
        const user = decodedToken.user;

        // check user
        if (!user){
            throw new Error('Invalid token!');
        }

        req.user = user; 
        next();
    } catch (err) {
        res.status(401).send({ error: 'You need to log into your account!~' });
    }
};

module.exports = requireLogin;