'use strict';

const http = require('http');
const fs = require('fs');

const port = Number(process.argv[2]);
const file = process.argv[3];

http.createServer(function (req, res) {
    fs.createReadStream(file)
        .on('error', function () {
            res.writeHead(500);
            res.end('Server Error');
        })
        .pipe(res);
}).listen(port);