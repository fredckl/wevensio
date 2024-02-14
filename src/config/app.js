const { env } = require('../helpers')

const app = {
  name: env('APP_NAME', 'wevensio'),
  nodeEnv: env('NODE_ENV', 'production'),
  port: env('PORT', '5001')
}

module.exports = app
