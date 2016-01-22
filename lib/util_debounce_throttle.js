/*
 * util_debounce_throttle
 * https://github.com/mithriljs-cn/util_debounce_throttle
 *
 * Copyright 2015, mithriljs.cn@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define([], factory);
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.util_debounce_throttle = factory();
  }
}(this, function() {
  'use strict'

  function _debounce (func, delay, doFirst) {
    var timer, first = doFirst
    if(delay === undefined) {
      delay = 100
    }
    return function() {
      var self = this, args = arguments
      var exec = function(isFirst) {
        func.apply(self, args)
        first = isFirst ? false : doFirst
      }
      clearTimeout(timer)
      timer = setTimeout(exec, delay)
      if(first) exec(true)
    }
  }

  function _throttle (func, delay, ignoreLast) {
    var timer, lastTime = 0
    if(delay === undefined) {
      delay = 100
    }
    return function() {
      var self = this, args = arguments
      var exec = function() {
        lastTime = new Date()
        func.apply(self, args)
      }
      var diff = new Date() - lastTime
      if (diff > delay) {
        exec()
      } else if(!ignoreLast) {
        clearTimeout(timer)
        timer = setTimeout(exec, delay - diff)
      }
    }
  }
  return { _debounce:_debounce, _throttle:_throttle }
}));
