const { config } = require('./helpers')
const express = require('express')
const app = express()
const routes = require('./routes')
const http = require('node:http')
const { readFileSync } = require('fs')

const server = http.createServer({
  key: readFileSync(config('ssl.key')),
  cert: readFileSync(config('ssl.cert'))
}, app)

app.use(express.json())
app.use('/', routes)

server.listen(config('app.port'))

module.exports = server
