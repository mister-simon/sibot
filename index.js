// @ts-ignore
const sibot = require('./sibot/sibot');
const server = require('./server/server');
const { env } = require('./config');

sibot({
    token: env.DISCORD_TOKEN,
    owner: env.DISCORD_OWNER
});

server({
    PORT: env.PORT || 5000
});
