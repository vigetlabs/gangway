module.exports = function (options) {
  var answer = typeof options.mock === 'function' ? options.mock(options) : options.mock

  return options.Promise.resolve(answer)
}
