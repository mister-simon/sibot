// @ts-ignore
const sibot = require('./sibot/sibot');
const config = require('./config');

sibot({
    token: config.DISCORD_TOKEN,
    owner: config.DISCORD_OWNER
});
