module.exports = function MessageHandler ({ router, owner, username }) {
    return function handler (message) {
        const isBot = message.author.bot;
        const isSelf = isBot && message.author.username === username;
        const isOwner = message.author.username === owner;

        const matchedRoute = router.test(message.content, { isBot, isSelf, isOwner });

        if (matchedRoute) {
            matchedRoute.controller({
                data: matchedRoute.data,
                message,
                isOwner,
                isBot,
                isSelf
            });
        }
    };
};
