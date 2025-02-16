const { env } = require('../helpers')

const ssl = {
  key: env('SSL_KEY'),
  cert: env('SSL_CERT')
}

module.exports = ssl
