const { config } = require('./helpers')
const express = require('express')
const app = express()
const routes = require('./routes')
const http = require('node:http')
const { initSocket } = require('./socket')

const httpServer = http.createServer(app)

app.use(express.json())
app.use('/', routes)

initSocket(httpServer)

httpServer.listen(config('app.port'))

module.exports = httpServer
