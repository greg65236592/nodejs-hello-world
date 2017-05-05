var fs = require('fs');
var testOutputDir = 'test_output';

exports.createTestOutputDir = function createTestOutputDir() {
    if (!fs.existsSync(testOutputDir)) {
        fs.mkdirSync(testOutputDir);
    }
}