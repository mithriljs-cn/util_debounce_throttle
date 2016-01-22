var sinon = require('sinon')
var expect = require('chai').expect
var util = require('../lib/util_debounce_throttle')

beforeEach(function(){
	var self = this
	self.sinon = sinon.sandbox.create()
	self.clock = self.sinon.useFakeTimers()
	self.tick = function(time){
		self.clock.tick( time - self.clock.now )
	}
})

afterEach(function(){
	this.sinon.restore()
})


// var log = function(str){ console.log( str ); return str }

describe('# Throttle test', function(){
	it('Throttle func without arguments', function(){
		var _sinon = this.sinon
		var _tick = this.tick

		var oldFunc = _sinon.spy()
		var newFunc = _sinon.spy( util._throttle(oldFunc, 100) )

		setInterval(newFunc, 30)
		
		_tick(20)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(0)

		_tick(40)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(1)

		_tick(101)
		expect(oldFunc.callCount).eq(1)
		expect(newFunc.callCount).eq(3)

		_tick(220)
		expect(oldFunc.callCount).eq(2)
		expect(newFunc.callCount).eq(7)

		expect( oldFunc.getCall(0).args.length ).eq(0)

	})

	it('Throttle func with arguments', function(){
		var _sinon = this.sinon
		var _tick = this.tick

		var oldFunc = _sinon.spy()
		var newFunc = _sinon.spy( util._throttle(oldFunc, 100) )

		setInterval(function(){ newFunc('foo') }, 30)
		
		_tick(20)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(0)

		_tick(40)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(1)

		_tick(101)
		expect(oldFunc.callCount).eq(1)
		expect(newFunc.callCount).eq(3)

		_tick(220)
		expect(oldFunc.callCount).eq(2)
		expect(newFunc.callCount).eq(7)

		expect( oldFunc.getCall(0).args.length ).eq(1)

		expect( oldFunc.alwaysCalledWithExactly('foo') ).ok
		expect( newFunc.alwaysCalledWithExactly('foo') ).ok

	})

	it('Throttle func with arguments, ignore last interval', function(){
		var _sinon = this.sinon
		var _tick = this.tick

		var oldFunc = _sinon.spy()
		var newFunc = _sinon.spy( util._throttle(oldFunc, 100, true) )

		setInterval(function(){ newFunc('foo') }, 30)
		
		_tick(20)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(0)

		_tick(40)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(1)

		_tick(101)
		expect(oldFunc.callCount).eq(0)
		expect(newFunc.callCount).eq(3)

		_tick(220)
		expect(oldFunc.callCount).eq(1)
		expect(newFunc.callCount).eq(7)

		_tick(300)
		expect(oldFunc.callCount).eq(2)
		expect(newFunc.callCount).eq(10)

		expect( oldFunc.getCall(0).args.length ).eq(1)
		expect( newFunc.getCall(0).args.length ).eq(1)

		expect( oldFunc.alwaysCalledWithExactly('foo') ).ok
		expect( newFunc.alwaysCalledWithExactly('foo') ).ok

	})

})

xdescribe('# Debounce test', function(){
	it('Debounce func without arguments', function(){
	})
	it('Debounce func with arguments', function(){
	})
	it('Debounce func with arguments, call at first', function(){
	})
})


