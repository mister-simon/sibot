const Discord = require('discord.js');
const client = new Discord.Client();
const MessageHandler = require('./lib/MessageHandler');
const router = require('./router');

module.exports = ({ token, owner }) => {
    // Set up the bot
    client.once('ready', () => {
        client.user.setActivity('with code - .help');

        const handleMessage = MessageHandler({
            router,
            owner,
            username: client.user.username
        });
        client.on('message', handleMessage);

        console.log(`
        ______i___
        |O      0|
        | ==~~== |  < I am Sibot, the discord bot. )
        ‾‾‾‾‾‾‾‾‾‾   \\       Beep, borp.          /`);
    });

    client.login(token);
};
