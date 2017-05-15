var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const EventEmitter = require('events');

app.use(express.static('resources'));

app.use(function (req, res, next) {
    console.log('App Middleware1 In! Path: ' + req.path + ' Time:', Date.now())
    next();
});

app.use(function (req, res, next) {
    console.log('App Middleware2 In! Path: ' + req.path + ' Time:', Date.now())
    next();
});

app.get('/', function (req, res) { // This path won't be hijact by below get function IF YOU PUT IT *BEFORE*
    res.send('Hello World');
})

app.get('/page/*', function (req, res) {
    var path = req.path;
    path = path.replace('/page/', '')
    console.log('Path:' + path);
    res.sendFile(__dirname + '/html/' + path + '.html');
})

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/process_post', urlencodedParser, (req, res) => { //(app.post(path, callback [, callback ...])) urlencodedParser is used as a middleware to process the data
    var firstName = req.body.firstName,
        lastName = req.body.lastName;
    res.send('Post success, firstName:' + firstName + ", lastName: " + lastName);
});

app.get('/*', function (req, res) { //Handle the rest requset (Not RESTFul service)
    console.log('get the rest');
    res.send('Handle by last handler.');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})