var fs = require('fs');
var common = require('./common.js');
/**
 * Piping stream
 */
common.createTestOutputDir();
var readerPipeStream = fs.createReadStream('piping_input.txt');
var writerPipeStream = fs.createWriteStream('test_output/piping_output.txt');
readerPipeStream.pipe(writerPipeStream);
readerPipeStream.on('end', function(){
    writerPipeStream.end();
});
writerPipeStream.on('finish', function(){
    console.log('piping finish.');
});