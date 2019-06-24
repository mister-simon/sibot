const { readFileSync } = require('fs');
const { resolve } = require('path');
module.exports = readFileSync(resolve(__dirname, 'beautiful-ascii-art.txt'), 'UTF-8');
