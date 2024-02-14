const fs = require('node:fs')
const { includes, reject, compose, reduce, __, replace } = require('ramda')

const removeExt = replace(/.js/i, '')

const config = compose(
  reduce((acc, d) => ({ ...acc, [removeExt(d)]: require(`./${d}`) }), {}),
  reject(includes(__, ['index.js']))
)(fs.readdirSync(__dirname))

module.exports = config
