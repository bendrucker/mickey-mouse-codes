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
  var meta = document.createElement('meta')
  meta.name = 'viewport'
  meta.content = iOS9Viewport
  document.head.appendChild(meta)

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
