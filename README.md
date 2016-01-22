# util_debounce_throttle  [![Build Status](https://travis-ci.org/mithriljs-cn/util_debounce_throttle.svg?branch=master)](https://travis-ci.org/mithriljs-cn/util_debounce_throttle)

**debounce throttle helper function in node & browser**

## Usage:

````
var _debounce = require('util_debounce_throttle')._debounce
var _throttle = require('util_debounce_throttle')._throttle


//send user mousemove data per 100ms
var sendData = function( evt ){ /* here send user event data when mousemove */ }
var _sendData = _throttle( sendData , 100 )
document.onmousemove = _sendData


//send user click data when user not click after 3000ms
var sendData = function( evt ){ /* here send user event data when mousemove */ }
var _sendData = _debounce( sendData , 3000 )
document.click = _sendData
````


### About the test

This lib tested with [SINON.JS](http://sinonjs.org/)

### Copyright @ Mithriljs_CN
