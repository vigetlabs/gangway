var singularize = require('./singularize')
var url = require('./url')

module.exports = function segmentize (segments) {

  return segments.map(function(segment, i) {

    return segment + (i === segments.length - 1 ? '' : '/{' + singularize(segment) + '_id}')
  }).reduce(url.resolve, '')
}
