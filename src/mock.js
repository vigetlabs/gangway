module.exports = function (options) {
  return typeof options.mock === 'function' ? options.mock(options) : options.mock
}
