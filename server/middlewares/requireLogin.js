const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user.model');
const { normalizeErrors } = require('../helpers/mongoose-error');

const requireLogin = async (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token') || req.header('Authorization').replace('Bearer ', '');

    // Check if not token
    if (!token) {
        return res.status(401).json({ 
            errors: [{
                title: 'Invalid token',
                detail: 'No token, authorization denied'
            }]
         });
    }

    // Verify token
    try {
        const decodedToken = jwt.verify(token, keys.SECRET);
        const user = decodedToken.user;
        const authorizedUser = await User.findById(user.id);

        // check user
        if (!user){
            throw new Error('Invalid token!');
        }

        req.user = authorizedUser; 
        next();

    } catch (err) {
        res.status(401).send({ error: 'You need to log into your account!~' });
    }
};


module.exports = requireLogin;