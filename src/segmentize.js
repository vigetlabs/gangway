var Inflector = require('inflected')
var url = require('./url')

module.exports = function segmentaize (segments) {

  return segments.map(function(segment, i) {

    return segment + (i === segments.length - 1 ? '' : '/{' + Inflector.singularize(segment) + '_id}')
  }).reduce(url.resolve, '')
}
