'use string';

const fs = require('fs');

const fileName = process.argv[2];

fs.readFile(fileName, 'utf-8', (err,data) => {
    if (err){
        console.error(err);
        return;
    }
    const lines = data.split('\n').length -1;

    console.log(lines);
});
