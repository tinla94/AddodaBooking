const mongoose = require('mongoose');
const FakeData = require('../fake-db');

mongoose.Promise = global.Promise;
// connecting to mongoDB
mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
})
    .then(() => {
        // Fetching fake data
        if (process.env.NODE_ENV !== 'production') {
            const fakeDb = new FakeDb();
            fakeDb.seedDb();
        }
    })
    .then(() => console.log(`Connecting to mongodb`))
    .catch(e => console.error(e.message));