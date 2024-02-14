const { config } = require('../helpers')

const getClient = (name = config('datastore.default')) => {
  const client = require(`./${name}`)

  return client()
}

module.exports = getClient
