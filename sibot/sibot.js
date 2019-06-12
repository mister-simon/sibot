const Discord = require('discord.js');
const client = new Discord.Client();
const MessageHandler = require('./lib/MessageHandler');
const router = require('./router');

module.exports = function (config) {
    // Set up the bot
    client.once('ready', () => {
        console.log(`
        ______i___
        |O      0|
        | ==~~== |  < I am Sibot, the discord bot. )
        ‾‾‾‾‾‾‾‾‾‾   \\       Beep, borp.          /`);
    });

    client.on('message', MessageHandler(router));

    client.login(config.botToken);
};
