var fs = require("fs");
var data = 'Simply Easy Learning';

// Create a writable stream
var writerStream = fs.createWriteStream('output.txt');

// Write the data to stream with encoding to be utf8
writerStream.write(data,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");

console.log('=======================')

/**
 * Copy a file using stream
 */
var readStream = fs.createReadStream('input.txt');
var writerStream = fs.createWriteStream('output_from_input.txt');
var data = '';
readStream.setEncoding('UTF8');
readStream.on('data', function(chunk) {
   writerStream.write(chunk, 'UTF8');
   data += chunk;
});
readStream.on('end', function(){
    console.log(data);
    writerStream.end();
});
writerStream.on('finish', function(){
    console.log('write finished, with data: ' + data);
});
// writerStream.on('finish', function() {
//     console.log("Read completed." + new Date());
// });

