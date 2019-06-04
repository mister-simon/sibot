module.exports = function messageRouter() {
    let routes = [];

    function testPattern(pattern, message) {
        if (pattern instanceof RegExp) {
            return pattern.test(message);
        }

        return message === pattern;
    }

    function matchPattern(pattern, message) {
        if (pattern instanceof RegExp) {
            return message.match(pattern);
        }

        return null;
    }

    return {
        add(route) {
            routes.push(route);
        },
        test(message) {
            for (const route of routes) {
                if (testPattern(route.pattern, message)) {
                    return {
                        controller: route.controller,
                        data: matchPattern(route.pattern, message)
                    };
                }
            }
            return null;
        }
    };
};