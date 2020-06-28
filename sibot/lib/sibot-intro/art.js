const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = {
    intro: readFileSync(resolve(__dirname, 'beautiful-ascii-art.txt'), 'UTF-8'),
    error: readFileSync(resolve(__dirname, 'beautiful-ascii-art-shutdown.txt'), 'UTF-8'),
};
