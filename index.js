// @ts-ignore
const sibot = require('./sibot/sibot');
const { env } = require('./config');

sibot({
    token: env.DISCORD_TOKEN,
    owner: env.DISCORD_OWNER,
});
