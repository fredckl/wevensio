const { split } = require('ramda')
const { env } = require('../src/helpers')

const channels = split(',', env('CHANNELS', ''))

module.exports = channels
