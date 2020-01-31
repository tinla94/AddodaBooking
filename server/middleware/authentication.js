const jwt = require("jsonwebtoken");
const normalizeErrors = require("../helpers/mongoose");
const User = require('../models/user');
const keys = require("../config/keys");



// User authentication middleware
exports.authMiddleware = async (req, res, next) => {
    // Get token
    const token = req.headers.authorization;

    if (token) {
        // token = [Bearer,token]
        const user = parseToken(token);
        // Find user id
        // User.findById(user.userId, function (err, user) {
        //     if (err) {

        //     }


        // });
        try {
            const foundUser = User.findById(user.userId);

            // assign user to local
            if (foundUser) {
                res.locals.user = foundUser;
                next();
            } else {
                return notAuthorized(res);
            }

        } catch(e) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
    } else {
        return notAuthorized(res);
    }
};

// Token Decoding
const parseToken = (token) => {
    // token = [Bearer, token]
    return jwt.verify(token.split(" ")[1], keys.SECRET);
}

const = notAuthorized(res) => {
    return res.status(401).send({
        errors: [
            { title: "Not authorized!", detail: "You need to login to get access!" }
        ]
    });
}