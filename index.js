'use strict'

var Struct = require('observ-struct')
var Observ = require('observ')
var h = require('virtual-dom/h')
var partial = require('ap').partial
var mailto = require('mailto-link')
var sms = require('sms-link')
var href = require('location-href')
var format = require('simple-format')
var fs = require('fs')

var Modal = require('./modal')
var Codes = require('./codes')

var subject = fs.readFileSync(__dirname + '/subject.txt', 'utf8')
var body = fs.readFileSync(__dirname + '/body.txt', 'utf8')

module.exports = App

function App (data) {
  data = data || {}

  var state = Struct({
    modal: Modal(data.modal),
    codes: Codes(data.codes),
    code: Observ()
  })

  Codes.onSelect(state.codes, state.code.set)
  state.code(partial(Modal.open, state.modal))

  Modal.onResult(state.modal, function onResult (data) {
    open(state.code(), data)
  })

  return state
}

function open (code, options) {
   href.set(link(code, options.type))
}

App.render = function render (state) {
  return h('main', [
    Modal.render(state.modal),
    Codes.render(state.codes)
  ])
}

var types = {
  email: mailto,
  sms: sms
}
function link (code, type) {
  var href = 'https://www.eazeup.com/invite/' + code.toLowerCase()
  return types[type]({
    subject: subject,
    body: format(body, href)
  })
}
