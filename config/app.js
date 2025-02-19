const { env } = require('../src/helpers')

const app = {
  name: env('APP_NAME', 'wevensio'),
  nodeEnv: env('NODE_ENV', 'production'),
  port: env('PORT', '5001'),
  jwtSecret: env('JWT_SECRET', 'secret')
}

module.exports = app
