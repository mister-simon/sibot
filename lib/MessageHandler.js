module.exports = function MessageHandler (router) {
    return function handler (message) {
        if (message.author.bot) {
            return;
        }

        const matchedRoute = router.test(message.content);

        if (matchedRoute) {
            matchedRoute.controller({
                message,
                data: matchedRoute.data
            });
        }
    };
};
