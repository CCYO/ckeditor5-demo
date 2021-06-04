const redis = require('redis')

const redisClient = redis.createClient()

redisClient.on("error", function(error) {
    console.error('Redis connect Err ==> ', error);
  });

redisClient.on('connect', function(){
    console.log('Redis client connected');
});

module.exports = redisClient