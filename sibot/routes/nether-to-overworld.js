const { mention } = require('../lib/StringResponseUtils');

module.exports = {
    example: '.n2o 800, -800',
    description: 'Converts nether coords to overworld coords. Multiply both by 8 and rounds the result.',
    pattern: /^\.n2o (?<x>(-)?\d+),? (?<z>(-)?\d+)$/i,
    controller({ message, data, isEdit, oldMessage }) {
        const { x, z } = data.groups;
        const coords = [x,z].map(coord => Math.round(parseInt(coord, 10) * 8));
        return message.channel.send(`${mention(message.author)} ${coords.join(', ')}`);
    },
};
