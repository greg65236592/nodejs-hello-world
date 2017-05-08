var fs = require('fs');
var common = require('./common.js');
var testAppendFilePath = common.createTestOutputDir() + '/appendTest.txt';

fs.unlinkSync(testAppendFilePath);

fs.open(testAppendFilePath, 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("File opened successfully!");
});

var times = 5;
while (times > 0) {
    fs.appendFile(testAppendFilePath, JSON.stringify(new Date()) + '\r\n', 'utf-8', function () {
        console.log('Finish!');
    });
    times --;
}