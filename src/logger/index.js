const { format, createLogger, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const { config } = require('../helpers')
const { DateTime } = require('luxon')

const NODE_ENV = config('app.nodeEnv')

const errorTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  level: 'error',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const combinedTransport = new DailyRotateFile({
  filename: `logs/${config('name')}-%DATE%.log`,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const defaultFormat = format.printf(({ level, message, timestamp }) => {
  const date = DateTime.fromISO(timestamp).toFormat('yyyy-LL-dd HH:mm:ii')

  return `[${date}] ${NODE_ENV}.${level.toUpperCase()}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.splat(),
    format.metadata(),
    format.timestamp(),
    format.json(),
    defaultFormat
  ),

  transports: [
    errorTransport,
    combinedTransport
  ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: defaultFormat
  }))
}

module.exports = logger
