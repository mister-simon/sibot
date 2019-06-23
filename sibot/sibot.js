const Discord = require('discord.js');
const client = new Discord.Client();
const MessageHandler = require('./lib/MessageHandler');
const router = require('./router');

module.exports = ({ token, owner }) => {
    // Set up the bot
    client.once('ready', () => {
        // Playing - with code - .help
        client.user.setActivity('with code - .help');

        const handler = MessageHandler({
            router,
            owner,
            username: client.user.username
        });

        client.on('message', handler);
        client.on('messageUpdate', (oldMessage, newMessage) => handler(newMessage, oldMessage));

        console.log(`
        ______i___
        |O      0|
        | ==~~== |  < I am Sibot, the discord bot. )
        ‾‾‾‾‾‾‾‾‾‾   \\       Beep, borp.          /`);
    });

    client.login(token);
};
