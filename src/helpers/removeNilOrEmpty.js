const { pipe, map, when, is, reject, ifElse, F, either, isEmpty, isNil } = require('ramda')

const removeNilOrEmpty = pipe(
  map(when(is(Object), v => removeNilOrEmpty(v))),
  reject(ifElse(is(String), F, either(isEmpty, isNil)))
)

module.exports = removeNilOrEmpty
