var mkdirp = require('mkdirp');
var testOutputDir = 'test_output';

exports.createTestOutputDir = function createTestOutputDir() {
    mkdirp.sync(testOutputDir);
    return testOutputDir;
}

exports.testOutputDir = testOutputDir;