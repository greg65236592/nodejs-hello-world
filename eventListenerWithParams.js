var events = require('events');
var eventEmitter = new events.EventEmitter();

var listener1Arg1 = 'test1';
var listener1Arg2 = 'test2';
var listener1Arg3 = 'test3';
var listener2Arg4 = 'test4';
var listener2Arg5 = 'test5';

var callBackTest = undefined;

// listener #1
var listner1 = function listner1() {
   console.log('listner1 executed.');
   console.log('listener1 callback');
   callBackTest(listener1Arg1, listener1Arg2, listener1Arg3);
}

// listener #2
var listner2 = function listner2() {
  console.log('listner2 executed.');
}

// Bind the connection event with the listner1 function
eventEmitter.addListener('connection', listner1);

// Bind the connection event with the listner2 function
eventEmitter.on('connection', listner2);

var eventListeners = require('events').EventEmitter.listenerCount
   (eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

//assign callback
callBackTest = function(arg1, arg2, arg3){
    console.log('callback in:');
    console.log(arg1);
    console.log(arg2);
    console.log(arg3);
}

// Fire the connection event 
eventEmitter.emit('connection');

// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");

// Fire the connection event 
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

console.log("Program Ended.");