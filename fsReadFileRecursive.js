/**
 * This is a very stupid example, I used rescursive approach to read whole file using fs.read(fd, buf, 0, buf.length, position, function (err, bytes) api.
 * Should use fs.createReadStream instead.
 * 
 * Bad practice, in this example, if the input file is too big, the recursive function will get an 'RangeError: Maximum call stack size exceeded' exception.
 * Haven't find a solution yet.
 */

var fs = require("fs");
// var testFilePath = '/Users/greg/Documents/wildfly-10.0.0.Final/standalone/log/server.log.2016-12-26';
var testFilePath = 'readFileTest.txt';

console.log("Going to open an existing file");
fs.open(testFilePath, 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("File opened successfully!");
    console.log("Going to read the file");
    const stats = fs.statSync(testFilePath)
    const fileSizeInBytes = stats.size;
    var position = 0;
    console.log("File bytes:" + fileSizeInBytes);
    readRescursive(fd, fileSizeInBytes, 0);
});

function readRescursive(fd, fileSizeInBytes, position) {
    console.log('*** Recursive run file size: ' + position);
    var buf = new Buffer(100);
    fs.read(fd, buf, 0, buf.length, position, function (err, bytes) {
        if (err) {
            console.log(err);
        }
        console.log(bytes + " bytes read");

        // Print only read bytes to avoid junk.
        if (bytes > 0) {
            console.log('---' + buf.slice(0, bytes).toString());
        }
    });
    position += buf.length;
    if (fileSizeInBytes > position) {
        readRescursive(fd, fileSizeInBytes, position)
    } else {
        // Close the opened file.
        fs.close(fd, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("File closed successfully.");
        });
    }
}