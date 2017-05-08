/**
 * Use promise to solve recursive problem
 */

var fs = require("fs");
var testFilePath = '/Users/greg/Documents/wildfly-10.0.0.Final/standalone/log/server.log.2016-12-26';
// var testFilePath = 'readFileTest.txt';

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

    //while (fileSizeInBytes > position) {
    readWithPromise(fd, fileSizeInBytes, 0);
    //}

});

function readWithPromise(fd, fileSizeInBytes, position) {
    var promise = new Promise(function (resolve, reject) {

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

            position += buf.length;

            // free memory
            buf = null;

            resolve(position);
            if (fileSizeInBytes < position) {
                // Close the opened file.
                fs.close(fd, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("File closed successfully.");
                });
            }
        });

    });
    promise.then(function (res) {
        console.log('Promise res: ' + res);
        readWithPromise(fd, fileSizeInBytes, res);
    });
}