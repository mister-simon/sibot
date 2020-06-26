const result = require('dotenv').config();

if (result.error) {
    throw result.error;
}

const config = result.parsed;

export default config;
