var fs = require('fs');
var zlib = require('zlib');
var common = require('./common.js');

/**
 * compress file
 */
var readerPipeStream = fs.createReadStream('input.txt');
readerPipeStream.pipe(zlib.createGzip())
   .pipe(fs.createWriteStream(common.createTestOutputDir() + '/input.txt.gz'));