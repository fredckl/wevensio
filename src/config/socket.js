const { env } = require('../helpers')

const socket = {
  subscribe: env('SUBSCRIBE', 'subscribe.default'),
  basicAuth: env('SOCKET_IO_BASIC_AUTH', false),
  basicAuthUsername: env('SOCKET_IO_BASIC_AUTH_USER', false),
  basicAuthPassword: env('SOCKET_IO_BASIC_AUTH_PASSWORD', false),
  cors: env('SOCKET_IO_CORS_ORIGIN', '*')
}

module.exports = socket
