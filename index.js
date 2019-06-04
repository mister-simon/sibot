const Discord = require('discord.js');
const client = new Discord.Client();
const MessageRouter = require('./lib/MessageRouter');

const config = require('./config.json');

// Create the routes
const router = MessageRouter(require('./routes/roll-dice'));

// Matches an amount of dice with a given size
// Returns a message with rolls made + sum
router.add();

// Set up the bot
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) {
        return;
    }

    const matchedRoute = router.test(message.content);
    if (matchedRoute) {
        matchedRoute.callback({
            message,
            data: matchedRoute.data
        });
    }
});

client.login(config.botToken);