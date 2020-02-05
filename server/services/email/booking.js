const sgMail = require('./sgMail');

const confirmBooking = async (email, firstname, bookingNumber ) => {
    await sgMail.send({
        to: email,
        from: 'no@reply.overnightbooking.com',
        subject: `Booking Confirmation`,
        text: `Hi ${firstname}, thank you for using OvernightBooking. Here is your booking confirmation number: ${bookingNumber}.`
    });
};

const cancelBooking = async () => {
    await sgMail.send({
        to: email,
        from: 'no@reply.overnightbooking.com',
        subject: `Booking Cancel Confirmation`,
        text: `Hi ${firstname}, your booking with number ${bookingNumber} has been successfully cancelled. Thank you for using OvernightBooking.`
    })
}