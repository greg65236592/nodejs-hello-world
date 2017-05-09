/**
 * Use promise to solve recursive problem, also tried to use v8-profiler for monitor memory leak.
 */
require('v8-profiler');
var fs = require("fs");
var testFilePath = '/Users/greg/Documents/wildfly-10.0.0.Final/standalone/log/server.log.2016-12-26';
// var testFilePath = 'readFileTest.txt';

//Detecting memory leak.
var leaks = [];

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

    readWithPromise(fd, fileSizeInBytes, 0);

});

function readWithPromise(fd, fileSizeInBytes, position) {
    var promise = new Promise(function (resolve, reject) {

        var buf = new Buffer(10000);
        leaks.push(buf);

        fs.read(fd, buf, 0, buf.length, position, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            console.log(bytes + " bytes read");

            // Print only read bytes to avoid junk.
            if (bytes > 0) {
                console.log('---' + buf.toString());
            }

            if (fileSizeInBytes < position) {
                // Close the opened file.
                fs.close(fd, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("File closed successfully.");
                    return;
                });
            }

            //Update position
            position += buf.length;

            // free memory, assign null seens to be useless. Fill null value save me almost 50% memeory (500MB -> 250MB, test file size 286MB)
            buf.fill(null);

            // Pass to resolve
            resolve(position);
            
        });

    });
    // Go recursive if not ended
    if (fileSizeInBytes > position) {
        promise.then(function (res) {
            console.log('Promise res: ' + res);
            readWithPromise(fd, fileSizeInBytes, res);
        });
    }
}