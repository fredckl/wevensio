const { env } = require('../src/helpers')

const client = {
  default: 'redis',
  clients: {
    redis: {
      url: env('REDIS_URL', 'redis://localhost:6379')
    }
  }
}

module.exports = client
