const { env } = require('../../config');
const { DISCORD_DEBUG_UNCAUGHT } = env;

module.exports = {
    example: '"Literally anything"',
    description: 'The bot will at least listen to you.',
    pattern: /.+/,
    authorise: ({ isSelf }) => !isSelf,
    controller({ ...props }) {
        if (DISCORD_DEBUG_UNCAUGHT) {
            console.log('uncaught message', props);
        }
    },
};
