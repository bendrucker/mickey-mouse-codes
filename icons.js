'use strict'

var sizes = [57, 76, 120, 152, 167, 180]

module.exports = function icons (document) {
  sizes.forEach(function (size) {
    var dimensions = size + 'x' + size
    var href = 'icons/icon-' + size + '.png'

    var apple = document.createElement('link')
    apple.rel = 'apple-touch-icon'
    apple.setAttribute('sizes', dimensions)
    apple.href = href

    var standard = document.createElement('link')
    standard.rel = 'icon'
    standard.setAttribute('sizes', dimensions)
    standard.href = href

    document.head.appendChild(apple)
    document.head.appendChild(standard)
  })
}
