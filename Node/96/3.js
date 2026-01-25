'use strict';
const fs = require('fs');

const fileName = process.argv[2];

const fileContents = fs.readFileSync(fileName, 'utf8');

const lines = fileContents.split('\n');

console.log(lines.length - 1);