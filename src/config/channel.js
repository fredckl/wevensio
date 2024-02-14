const { split } = require('ramda')
const { env } = require('../helpers')

const channels = split(',', env('CHANNELS', ''))

module.exports = channels
