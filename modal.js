'use strict'

var State = require('dover')
var Observ = require('observ')
var partial = require('ap').partial
var Event = require('weakmap-event')
var h = require('virtual-dom/h')
var clickEvent = require('value-event/click')
var prefix = require('preflex')

module.exports = Modal

function Modal () {
  var state = State({
    open: Observ(false),
    channels: {
      select: ResultEvent.broadcast,
      dismiss: dismiss
    }
  })

  Modal.onResult(state, partial(state.open.set, false))

  return state
}

var ResultEvent = Event()
Modal.onResult = ResultEvent.listen

function dismiss (state) {
  state.open.set(false)
}

Modal.render = function render (state) {
  if (!state.open) return
  return renderOverlay(state, function () {
    return renderModal(state)
  })
}

function renderOverlay (state, render) {
  var style = prefix({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0, .8)'
  })

  var options = {
    'ev-click': clickEvent(state.channels.dismiss),
    style: style
  }

  return h('overlay', options, render())
}

function renderModal (state) {
  var style = {
    background: 'white',
    borderRadius: '3px',
    width: '70%',
    padding: '12px'
  }

  return h('div', {style: style}, [
    renderButton('Email', state.channels.select, true),
    renderButton('SMS', state.channels.select)
  ])
}


function renderButton (title, onClick, margin) {
  var style = {
    display: 'block',
    width: '100%',
    padding: '24px 12px',
    fontSize: '22px',
    marginBottom: margin ? '12px' : '',
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'RGB(99, 137, 229)',
    borderRadius: '5px',
    border: 'none',
    color: 'white'
  }

  var options = {
    style: style,
    'ev-click': clickEvent(onClick, {
      type: title.toLowerCase()
    })
  }

  return h('button', options, title)
}

Modal.open = function open (state) {
  state.open.set(true)
}
