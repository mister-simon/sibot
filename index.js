const Discord = require('discord.js');
const client = new Discord.Client();
const MessageRouter = require('./lib/MessageRouter');

const config = require('./config.json');

// Create the routes
const router = MessageRouter();

// Matches an amount of dice with a given size
router.add(require('./routes/roll-dice'));

// Set up the bot
client.once('ready', () => {
    console.log('I am Sibot, the discord bot. Beep, borp.');
});

client.on('message', message => {
    if (message.author.bot) {
        return;
    }

    const matchedRoute = router.test(message.content);
    if (matchedRoute) {
        matchedRoute.controller({
            message,
            data: matchedRoute.data
        });
    }
});

client.login(config.botToken);