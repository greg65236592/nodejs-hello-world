var mkdirp = require('mkdirp');
var testOutputDir = 'test_output';
var testUploadDir = 'test_upload';

exports.createTestOutputDir = function createTestOutputDir() {
    mkdirp.sync(testOutputDir);
    return testOutputDir;
}

exports.createTestUploadDir = function createTestOutputDir() {
    mkdirp.sync(testUploadDir);
    return testUploadDir;
}

exports.createSpecificDir = function createSpecificDir(path) {
    mkdirp.sync(path);
    return path;
}

exports.testOutputDir = testOutputDir;
exports.testUploadDir = testUploadDir;