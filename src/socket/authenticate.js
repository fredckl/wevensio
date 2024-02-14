const { config } = require('../helpers')

const authenticate = (socket, next) => {
  if (!config('socket.basicAuth')) return next()

  const authorization = socket.request.headers.authorization
  if (!authorization) {
    const err = new Error('You are not authenticated!')
    return next(err)
  }

  // eslint-disable-next-line new-cap
  const [user, pass] = new Buffer.from(
    authorization.split(' ')[1],
    'base64'
  ).toString().split(':')

  if (user === config('socket.basicAuthUsername') && pass === config('socket.basicAuthPassword')) {
    next()
  } else {
    const err = new Error('You are not authenticated!')
    return next(err)
  }
  next()
}

module.exports = authenticate
