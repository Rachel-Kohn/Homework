'use strict';
const http = require('http');

const results = [];
let completed = 0;

function getData(index) {
    http.get(process.argv[2 + index], function (res) {
        let data = '';
        res.setEncoding('utf8');

        res.on('data', chunk => data += chunk);

        res.on('end', function () {
            results[index] = data;
            completed++;

            if (completed === 3) {
                for (let i = 0; i < 3; i++) {
                    console.log(results[i]);
                }
            }
        });

        res.on('error', console.error);
    }).on('error', console.error);
}

for (let i = 0; i < 3; i++) {
    getData(i);
}