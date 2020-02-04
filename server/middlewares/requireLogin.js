const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    const token = req.header('auth-token');

    // Check if token exists
    if(!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied!'
        });
    }

    // Verify token
    try {
        const decodedToken = await jwt.verify(token, keys.SECRET);
        const user = decodedToken.user;

        // if no user
        if(!user) {
            throw new Error('User is not found!');
        }

        // assign user through out application
        req.user = user;
        next(); 
    } catch (err) {
        console.error('Something wrong with auth middleware')
        res.status(500).json({ msg: 'Server Error' });
    }
};
