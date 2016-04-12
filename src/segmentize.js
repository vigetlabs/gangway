var singularize = require('./singularize')

module.exports = function segmentize (segments) {
  return segments.map(function(segment, i) {
    return segment + (i === segments.length - 1 ? '' : '/{' + singularize(segment) + '_id}')
  }).join('/')
}
