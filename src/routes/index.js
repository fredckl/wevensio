const express = require('express')

const app = express()

app.use('/messages', require('./messages'))

module.exports = app
