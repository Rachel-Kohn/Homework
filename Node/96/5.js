'use strict';

const fs = require('fs');
const path = require('path');

const folder = process.argv[2];
const ext = '.' + process.argv[3]; 
fs.readdir(folder, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const filtered = files.filter(file => path.extname(file) === ext);

    filtered.forEach(file => console.log(file));
});