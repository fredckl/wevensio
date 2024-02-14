require('dotenv').config()
const createSocket = require('./socket')
const server = require('./server')
const getClient = require('./datastores')
const { map } = require('ramda')
const logger = require('./logger')
const { config } = require('./helpers')
const authenticate = require('./socket/authenticate')

const io = createSocket(server)

io.use(authenticate)

io.on('connection', async (socket) => {
  const subscriber = getClient('redis')
  await subscriber.connect()
  const subscribe = config('socket.subscribe')
  const channels = config('channel')

  logger.info(`Open socket to ${subscribe}`)
  socket.on(subscribe, () => {
    logger.info(`Client connected to ${subscribe}`)
    map(channel => {
      logger.info(`Client subscribe to ${channel}`)
      subscriber.subscribe(channel, (message, channel) => {
        socket.emit(channel, message)
      })
    })(channels)
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
