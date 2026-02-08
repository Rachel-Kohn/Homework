'use strict';
const net = require('net');

function zeroPad(num) {
    return (num < 10 ? '0' : '') + num;
}

const server = net.createServer(function (socket) {
    const now = new Date();
    const dateTime = `${now.getFullYear()}-${zeroPad(now.getMonth() + 1)}-${zeroPad(now.getDate())} ${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}\n`;
    socket.end(dateTime);
});

server.listen(Number(process.argv[2]));