const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.REDIS_URL);
// create nested objects
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

// trigger cache function for data
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.keys || '');

    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    // create an object of queries
    // convert everything into JSON files
    // this.getQuery() = _id
    // mongooseCollection.name = collection name
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    // See if we have a value for 'key' in redis
    // key: hashKey 
    // value: (key: key, value: '')
    const cacheValue = await client.hget(this.hashKey, key);

    if (cacheValue) {
        const doc = JSON.parse(cacheValue);

        // return either array of records or an object of records
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10); // 'EX' = expiration, 10 = time

    return result;
}

module.exports = {
    clearHash(hashKey) {
        // find hash key and delete all values inside of it with 'del' 
        client.del(JSON.stringify(hashKey));
    }
};