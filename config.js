function getEnv() {
    // Set up .env variables if available
    try {
        require('dotenv').config();
    } catch (err) {}

    const { DISCORD_OWNER, DISCORD_TOKEN, PORT } = process.env;

    return {
        DISCORD_OWNER,
        DISCORD_TOKEN,
        PORT
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
