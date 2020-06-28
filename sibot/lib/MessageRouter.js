module.exports = function messageRouter() {
    const routes = [];

    function testPattern(pattern, message) {
        if (pattern instanceof RegExp) {
            return pattern.test(message);
        }

        return message === pattern;
    }

    function testMetadata(route, metadata) {
        if (route.authorise) {
            return route.authorise(metadata);
        }

        return metadata.isEdit === false || metadata.isSelf === false;
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
        test(message, metadata) {
            for (const route of routes) {
                if (testPattern(route.pattern, message) && testMetadata(route, metadata)) {
                    return {
                        controller: route.controller,
                        data: matchPattern(route.pattern, message),
                    };
                }
            }
            return null;
        },
        list(metadata) {
            return routes
                .filter((route) => testMetadata(route, metadata))
                .map(({ example, description }) => {
                    return { example, description };
                });
        },
    };
};
