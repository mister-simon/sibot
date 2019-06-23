module.exports = {
    example: '.profile',
    description: 'Set the profile picture (w/ attached image).',
    pattern: /\.profile(.*)/,
    authorise: ({ isOwner }) => isOwner,
    async controller ({ message }) {
        if (message.attachments.size === 0) {
            message.channel.send('An image attachment is required.');
            return;
        }

        message.client.user.setAvatar(message.attachments.first().url);
        message.channel.send('Everyone! Come see how good I look!');
    }
};
