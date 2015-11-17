'use strict'

var main = require('main-loop')
var vdom = require('virtual-dom')
var Delegator = require('dom-delegator')
var document = require('global/document')
var iOS9Viewport = require('meta-viewport-ios-9')
var App = require('./')
var codes = require('./codes.json')

setup()
run({codes: codes})

function setup () {
  var viewport = document.createElement('meta')
  viewport.name = 'viewport'
  viewport.content = iOS9Viewport
  document.head.appendChild(viewport)

  var appleStandalone = document.createElement('meta')
  appleStandalone.name = 'apple-mobile-web-app-capable'
  appleStandalone.content = 'yes'
  document.head.appendChild(appleStandalone)

  var standalone = document.createElement('meta')
  standalone.name = 'mobile-web-app-capable'
  standalone.content = 'yes'
  document.head.appendChild(standalone)

  document.body.style.margin = 0
}

function run (data) {
  Delegator()

  var state = App(data)
  var loop = main(state(), App.render, vdom)

  document.body.appendChild(loop.target)

  state(loop.update)

  return state
}
