const { config } = require('./helpers')
const express = require('express')
const app = express()

const http = require('http')

const server = http.createServer(app)

server.listen(config('app.port'))

module.exports = server
