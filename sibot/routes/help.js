const { escape } = require('../lib/StringResponseUtils');
const StringResponse = require('../lib/StringResponse');

function help(router) {
    return {
        example: '.help',
        description: 'What the bot can do for you.',
        pattern: '.help',
        controller({ message, isBot, isSelf, isOwner }) {
            const routes = router.list({ isBot, isSelf, isOwner });
            const response = StringResponse();

            response.line(`I can do some things, which I will now list for you. Boopity blarp ~ I am ${message.client.user.username}.`);
            response.line('**Example command** - Description.\n');
            routes.forEach(({ example, description }) => {
                response.line(`**${escape(example)}** - ${escape(description)}`);
            });

            message.author.send(response.render());
            message.channel.send('Get helped~ (in yr DMs).');
        },
    };
}

module.exports = help;
