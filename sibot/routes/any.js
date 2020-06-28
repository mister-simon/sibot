module.exports = {
    example: '"Literally anything"',
    description: 'The bot will at least listen to you.',
    pattern: /.+/,
    authorise: ({ isSelf }) => !isSelf,
    controller({ ...props }) {
        console.log('uncaught message', props);
    },
};
