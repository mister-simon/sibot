function bool(value) {
    return value != false && value.toLowerCase() !== 'false';
}

function getEnv() {
    // Set up .env variables if available
    try {
        require('dotenv').config();
    } catch (err) {}

    const { DISCORD_OWNER, DISCORD_TOKEN, PORT, DISCORD_DEBUG_UNCAUGHT } = process.env;

    return {
        DISCORD_OWNER,
        DISCORD_TOKEN,
        PORT,
        DISCORD_DEBUG_UNCAUGHT: bool(DISCORD_DEBUG_UNCAUGHT),
    };
}

function getConfigJson() {
    try {
        return require('config.json');
    } catch (err) {
        return {};
    }
}

module.exports = {
    ...getConfigJson(),
    env: getEnv(),
};
