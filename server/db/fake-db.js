const Rental = require('../models/rental.model');
const User = require('../models/user.model');
const Booking = require('../models/booking.model');

const fakeDbData = require('./data.json');


class FakeData {
    constructor() {
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;
    }

    // Clean fake db before adding again to avoid duplicates
    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    // Pushing fake data into database
    pushDataToDb() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;
      
            user.rentals.push(newRental);
            newRental.save();
        });

        user.save();
        user2.save();
    }


    // Adding seeds
    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeData;