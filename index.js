const Discord = require('discord.js');
const client = new Discord.Client();
const MessageRouter = require('./lib/MessageRouter');
const MessageHandler = require('./lib/MessageHandler');

const config = require('./config.json');

// Create the routes
const router = MessageRouter();

// Matches an amount of dice with a given size
router.add(require('./routes/roll-dice'));

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