'use strict';
const filterModule = require('./mymodule');

const dir = process.argv[2];
const ext = process.argv[3];

filterModule(dir, ext, function (err, list) {
    if (err) return console.error('Error:', err);

    list.forEach(file => console.log(file));
});