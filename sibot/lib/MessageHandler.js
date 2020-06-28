module.exports = function MessageHandler({ router, owner, username }) {
    function getMetadata(message, oldMessage) {
        const isBot = message.author.bot;
        const isSelf = isBot && message.author.username === username;
        const isOwner = message.author.username === owner;
        const isEdit = oldMessage !== undefined;
        return { isBot, isSelf, isOwner, isEdit, oldMessage };
    }

    return function handler(message, oldMessage) {
        const metadata = getMetadata(message, oldMessage);
        const matchedRoute = router.test(message.content, metadata);

        if (matchedRoute) {
            matchedRoute.controller({
                data: matchedRoute.data,
                message,
                ...metadata,
            });
        }
    };
};
