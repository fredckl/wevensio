const { mergeDeepRight, compose } = require('ramda')
const socketIo = require('socket.io')
const { config, removeNilOrEmpty } = require('../helpers')

const createSocket = (server, options = {}) => {
  const opts = compose(
    removeNilOrEmpty,
    mergeDeepRight({
      cors: {
        origin: config('socket.cors')
      }
    }))(options)
  return socketIo(server, opts)
}

module.exports = createSocket
