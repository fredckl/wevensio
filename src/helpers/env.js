const { pathOr } = require('ramda')

const env = (key, defaultValue) => {
  const value = pathOr(defaultValue, ['env', key])(process)
  if (value === 'false') return false
  if (value === 'true') return true
  return value
}

module.exports = env
