const Discord = require('discord.js');
const client = new Discord.Client();
const MessageHandler = require('./lib/MessageHandler');
const router = require('./router');
const art = require('./lib/sibot-intro/art');

module.exports = ({ token, owner }) => {
    // Set up the bot
    client.once('ready', () => {
        // Playing - with code - .help
        client.user.setActivity('with code - .help');

        const handler = MessageHandler({
            router,
            owner,
            username: client.user.username,
        });

        client.on('message', handler);
        client.on('messageUpdate', (oldMessage, newMessage) => handler(newMessage, oldMessage));

        console.log(art.intro);
    });

    client.login(token).catch((err) => {
        console.error("Please check your env has correctly configured 'DISCORD_TOKEN'");
        console.error(err.message);
        console.log(art.error);
    });
};
