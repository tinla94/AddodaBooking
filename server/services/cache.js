const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');


// Redis Port
let redisPort;

// Check production
if (process.env.NODE_ENV === 'production') {
  redisPort = process.env.REDIS_URL 
} else {
  redisPort = 'redis://127.0.0.1:6379'
}

// setup redis client
const client = redis.createClient({
    port: redisPort,
    retry_strategy: () => 1000
});
console.log(client.address);
client.hget = promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

// Creating cache() function
mongoose.Query.prototype.cache = function(options = { time: 60 }) {
  this.useCache = true;
  this.time = options.time;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};


// Modify exec() function for caching data
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery()
  });

  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    console.log("Response from Redis");
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  console.log(this.time);
  client.hmset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);

  console.log("Response from MongoDB");
  return result;
};

module.exports = {
  clearKey(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};