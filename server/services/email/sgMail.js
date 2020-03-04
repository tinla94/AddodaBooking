const sgMail = require('@sendgrid/mail');

// Setup sendgid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sgMail;