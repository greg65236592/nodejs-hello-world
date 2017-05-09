// var testBuffer = require('./buffer.js'); // when you include, the funcitons will be executed.

console.log(__filename);
// console.log(testBuffer.__filename); //This is undifined -> It means global vairables only available in current module, and cannot be access with others.

// One time
setTimeout(function(){
    console.log('setTimeout test.');
}, 1000);

// Now call above function after 2 seconds (Different from setTimeout)
setInterval(function(){
    console.log('interval test.');
}, 2000);

console.log('process pid: ' + process.pid);
console.log('process cpu: ' + JSON.stringify(process.cpuUsage()));
console.log('process mainModule: ' + JSON.stringify(process.mainModule));

process.on('exit', function(code) {
   console.log('==================About to exit with code:', code); // If I terminate process directly, it won't executed.
});