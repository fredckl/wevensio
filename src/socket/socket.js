const { mergeDeepRight, compose, map } = require('ramda')
const socketIo = require('socket.io')
const { config, removeNilOrEmpty } = require('../helpers')
const logger = require('../logger')
const authenticate = require('./authenticate')
const getClient = require('../datastores')

const initSocket = (server, options = {}) => {
  const opts = compose(
    removeNilOrEmpty,
    mergeDeepRight({
      cors: {
        origin: config('socket.cors')
      }
    }))(options)
  const io = socketIo(server, opts)
  io.use(authenticate)

  io.on('connection', async (socket) => {
    const subscriber = getClient('redis')
    const pub = subscriber.duplicate()
    await subscriber.connect()
    const subscribe = config('socket.subscribe')
    const channels = config('channel')
    await pub.connect()

    logger.info(`Open socket to ${subscribe}`)
    socket.on(subscribe, async () => {
      logger.info(`Client connected to ${subscribe}`)

      map(channel => {
        logger.info(`Client subscribe to ${channel}`)
        subscriber.subscribe(channel, (message, channel) => {
          socket.broadcast.emit(channel, message)
        })

        socket.on(channel, (message) => {
          pub.publish(channel, message)
        })
      })(channels)
    })

    pub.on('error', (error) => {
      logger.error(error)
    })

    socket.on('disconnect', () => {
      logger.info('disconnect')
      subscriber.quit()
    })

    socket.on('error', (error) => {
      logger.error(error)
    })

    socket.emit('connected')
  })
}

module.exports = initSocket
