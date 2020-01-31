const jwt = require("jsonwebtoken");
const normalizeErrors = require("../helpers/mongoose");
const User = require('../models/user');
const keys = require("../config/keys");

// Logging in user
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    // check email or password
    if (!password || !email) {
        return res.status(400).send({
            errors: [
                {
                    title: "Invalid Data",
                    detail: "Please provide valid email and password"
                }
            ]
        });
    }

    // login user
    try {
        const user = await User.findOne({ email });

        // check user
        if (!user) {
            return res.status(400).send({
                errors: [{
                    title: 'Invalid User',
                    detail: 'Account is not registered yet'
                }]
            });
        };

        // logging in user
        if (user.hasSamePassword(password)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    username: user.username
                },
                keys.SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                user, token
            })
        } else {
            return res.status(4400).send({
                errors: [
                    { 
                        title: "Invalid Data", 
                        detail: "Wrong email or password is not correct. Please try again" 
                    }
                ]
            });
        }

    } catch (err) {
        return res.status(400).send({ errors: normalizeErrors(err.errors) });
    }
};

// Registering user
exports.signup = async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;

    // check password and email
    if (!password || !email) {
        return res.status(422).send({
            errors: [
                { 
                    title: "Invalid Data", 
                    detail: "Please provide valid email and password" 
                }
            ]
        });
    }

    // check confirmation passwords
    if (password !== passwordConfirmation) {
        return res.status(422).send({
            errors: [
                {
                    title: "Invalid data",
                    detail: "Passwords are not matching"
                }
            ]
        });
    }

    // register user
    try {
        const existingUser = await User.findOne({ email });

        // check if user available
        if(existingUser) {
            return res.status(400).send({
                errors: [
                    {
                        title: "Invalid data",
                        detail: "Account is already registered"
                    }
                ]
            })
        }

        // register user if email is not taken
        const user = new User({
            username,
            email,
            password
        }); 

        await user.save((err) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.status(200).json({ user });
        })
    } catch (err) {
        return res.status(400).send({ errors: normalizeErrors(err.errors) });
    }
};

