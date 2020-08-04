const { mention } = require('../lib/StringResponseUtils');

module.exports = {
    example: '.o2n 800, -800',
    description: 'Converts overworld coords to nether coords. Divides both by 8 and rounds the result.',
    pattern: /^\.o2n (?<x>(-)?\d+),? (?<z>(-)?\d+)$/i,
    controller({ message, data, isEdit, oldMessage }) {
        const { x, z } = data.groups;
        const coords = [x,z].map(coord => Math.round(parseInt(coord, 10) / 8));
        return message.channel.send(`${mention(message.author)} ${coords.join(', ')}`);
    },
};
