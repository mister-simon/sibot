const { mention } = require('../lib/StringResponseUtils');

module.exports = {
    example: '.ping',
    description: 'Sibot pongs.',
    pattern: '.ping',
    controller ({ message }) {
        return message.channel.send(`${mention(message.author)} pong`);
    }
};
