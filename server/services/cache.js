const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

// create client for redis
const client = redis.createClient(keys.REDIS_URL);
client.hget = util.promisify(client.hget); // automatically call callback for use
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    return this;
}

mongoose.Query.prototype.exec = function() {

}