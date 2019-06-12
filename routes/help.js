const StringResponse = require('../lib/StringResponse');

function help (router) {
    return {
        example: '.help',
        description: 'What the bot can do for you.',
        pattern: '.help',
        controller ({ message }) {
            const routes = router.list();
            const response = StringResponse();

            response.line('Available commands:');
            routes.forEach(({ example, description }) => {
                response.line(`${example} - ${description}`);
            });

            message.channel.send(response.render());
        }
    };
}

module.exports = help;
