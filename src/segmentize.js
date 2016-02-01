var Inflector = require('inflected')
var url = require('./url')

module.exports = function segmentaize (segments) {
  return segments.reduce(function(memo, segment, i, all) {
    return url.resolve(memo, segment + (i === all.length - 1 ? '' : '/{' + Inflector.singularize(segment) + '_id}'))
  }, '')
}
