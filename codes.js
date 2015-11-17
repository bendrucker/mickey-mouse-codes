'use strict'

var State = require('dover')
var ObservArray = require('observ-array')
var Event = require('weakmap-event')
var h = require('virtual-dom/h')
var clickEvent = require('value-event/click')
var partial = require('ap').partial

module.exports = Codes

function Codes (data) {
  return State({
    list: ObservArray(data || []),
    channels: {
      select: SelectEvent.broadcast
    }
  })
}

var SelectEvent = Event()
Codes.onSelect = SelectEvent.listen

Codes.render = function render (state) {
  var style = {
    display: 'flex',
    flexWrap: 'wrap'
  }
  return h('codes', {style: style}, state.list.map(partial(renderCode, state.channels.select)))
}

function renderCode (onSelect, code, index) {
  var style = {
    width: '50%',
    padding: '6px 12px',
    boxSizing: 'border-box'
  }

  style['padding' + (index % 2 ? 'Left' : 'Right')] = '6px'

  return h('code', {style: style}, renderButton(code, onSelect))
}

function renderButton (code, onClick) {
  var style = {
    display: 'block',
    width: '100%',
    padding: '24px 12px',
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'RGB(99, 137, 229)',
    borderRadius: '5px',
    border: 'none',
    color: 'white'
  }

  var options = {
    style: style,
    'ev-click': clickEvent(onClick, code)
  }

  return h('button', options, code)
}
