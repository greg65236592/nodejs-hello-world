var fs = require('fs');
var common = require('./common.js');
/**
 * Copy a file using stream (bad practice, you can use pipe)
 */
common.createTestOutputDir();
var readerCopyStream = fs.createReadStream('input.txt');
var writerCopyStream = fs.createWriteStream('test_output/output_from_input.txt');
var data = '';
readerCopyStream.setEncoding('UTF8');
readerCopyStream.on('data', function(chunk) {
   writerCopyStream.write(chunk, 'UTF8');
   data += chunk;
});
readerCopyStream.on('end', function(){
    console.log(data);
    writerCopyStream.end();
});
writerCopyStream.on('finish', function(){
    console.log('write finished, with data: ' + data);
});