const mongoose = require('mongoose');
const FakeData = require('./fake-db');


mongoose.Promise = global.Promise;
// connecting to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    // .then(() => {
    //     // Fetching fake data
    //     if (process.env.NODE_ENV !== 'production') {
    //         const fakeDb = new FakeData();
    //         fakeDb.seedDb();
    //     }
    // })
    .then(() => console.log(`Connecting to mongodb`))
    .catch(e => console.error(e.message));