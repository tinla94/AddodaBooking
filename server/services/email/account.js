const sgMail = require('./sgMail');


exports.sendWelcomeEmail = async (email, firstname, lastname) => {
    await sgMail.send({
        to: email,
        from: 'no@reply.overnightbooking.com',
        subject: `Greeting from OvernightBooking`,
        text: `Hey ${firstname} ${lastnme}, thank you for joining OvernightBooking. At OvernightBooking, we strive to give our best service to all of our customer. If you have any question, you can reach us at 'Contact Us'`
    });
};


exports.sendCancellationEmail = async (email, firstname, lastname) => {
    await sgMail.send({
        to: email,
        from: 'no@reply.overnightbooking.com',
        subject: `Account Delete Confirmation`,
        text: `Hey ${firstname} ${lastnme}, thank you for using OvernightBooking. It is sad to see you leaving. We hope to see you reconsider using our service in the future.`
    });
};