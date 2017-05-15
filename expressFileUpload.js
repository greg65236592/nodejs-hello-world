var express = require('express');
var app = express();
var fs = require("fs");
var common = require("./common");

var bodyParser = require('body-parser');
var multer = require('multer');
var multerMiddleware = multer({ dest: __dirname + '/tmp/' })

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/file_upload_page', function (req, res) {
    res.sendFile(__dirname + "/html/" + "fileUpload.html");
})

app.post('/file_upload', multerMiddleware.single('avatar'), function (req, res) {
    console.log(req.file.filename);
    console.log(req.file.fieldname);
    console.log(req.file.mimetype);
    console.log(req.file.originalname);
    console.log(req.file.path);

    var filePath = common.createSpecificDir(common.testUploadDir + '/' + req.file.filename + '/') + req.file.originalname;

    
    var copyResult = new Promise(function (resolve, reject) {
        var ws = fs.createWriteStream(filePath);
        ws.on('close', () => {
            console.log('resolve in callback');
            resolve('upload success (promise.)');
        });
        fs.createReadStream(req.file.path).pipe(ws);
    });
    copyResult.then(function(result){
        fs.unlink(req.file.path);
        console.log(result);
        res.send(result);
    });
    
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})