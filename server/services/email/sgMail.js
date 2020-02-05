const sgMail = require('@sendgrid/mail');
const keys = require('../../config/keys');

// Setup sendgid
sgMail.setApiKey(keys.SENDGRID_API_KEY);

module.exports = sgMail;