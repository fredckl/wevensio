const { path, split } = require('ramda')
const config = require('../config')
const getConfig = (key) => {
  return path(split('.', key), config)
}

module.exports = getConfig
