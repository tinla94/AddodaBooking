const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const normalizeErrors = require("../helpers/mongoose-error");
const User = require('../models/user.model');
const keys = require("../config/keys");

// Logging in user
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    // check validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });

        // check user
        if (!user) {
            return res.status(400).json({ error: 'Account is not registered yet' });
        };

        // check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Password is not correct' });
        }

        // login user
        const payload = { user: { id: user.id } };

        // decode jwt code for token 
        jwt.sign(payload, keys.SECRET, { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;

            return res.status(200).json({ msg: 'Signing in user account...', user, token});
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Registering user
exports.signup = async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;
    const errors = validationResult(req);

    // check validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // check confirmation passwords
    if (password !== passwordConfirmation) {
        return res.status(422).json({ error: 'Passwords are not matching' });
    }

    try {
        const existingUser = await User.findOne({ email });

        // check if user available
        if(existingUser) {
            return res.status(400).json({ error: 'Email is already registerd'});
        };

        // register user if email is not taken
        const user = new User({
            username,
            email,
            password
        }); 

        await user.save((err) => {
            if (err) {
                return res.status(400).send(err);
            }

            return res.status(201).json({ msg: 'Account has been created', user});
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

