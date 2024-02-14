const redis = require('redis')
const logger = require('../logger')
const { config } = require('../helpers')

const options = {
  url: config('datastore.clients.redis.url')
}

const getRedisClient = () => {
  const redisClient = redis.createClient(options)

  redisClient
    .on('error', function (err) {
      logger.error('Redis error: %s', err)
    })

  redisClient.on('ready', () => {
    logger.info('Connected to Redis!')
  })

  return redisClient
}

module.exports = getRedisClient
