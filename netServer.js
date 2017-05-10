var net = require('net');
require('v8-profiler');
var d = require('domain').create();;

d.on('error', (er) => {
    console.log('catch ya!');
    console.log(er);
});

var server = net.createServer(function (connection) {
    d.run(() => {
        connection.setTimeout(10 * 1000, () => {
            connection.end(); //handle timeout from server side
        });
        console.log('client connected');

        connection.on('end', function () {
            console.log('client disconnected');
        });
        connection.write('Hello World!\r\n');
        setTimeout(function () {
            connection.write('WRITE ANOTHER.\r\n');
            setTimeout(function () {
                connection.write('WRITE ANOTHER AGAIN.\r\n');
            }, 1000);
        }, 1000)
        // connection.pipe(connection);
    });
});
server.listen(8081, function () {
    console.log('server is listening');
});