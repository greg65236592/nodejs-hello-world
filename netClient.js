var net = require('net');


setInterval(function () {
    var client = net.connect({ port: 8081 }, function () {
        console.log('connected to server!');
        console.log('-----------------------------');
        console.log('Buffer size:' + client.bufferSize);
        console.log('remoteAddress:' + client.remoteAddress);
        console.log('remoteFamily:' + client.remoteFamily);
        console.log('remotePort:' + client.remotePort);
        console.log('localAddress:' + client.localAddress);
        console.log('localPort:' + client.localPort);
        console.log('-----------------------------');
    });
    client.on('data', function (data) {
        console.log(data.toString());
        // client.end(); // If called end() the socket will be close at both server and client side.
    });
    client.on('end', function () {
        console.log('disconnected from server');
    });
}, 2000)