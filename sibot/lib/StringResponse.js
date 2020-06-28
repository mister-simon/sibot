module.exports = function StringResponse() {
    const items = [];

    return {
        line(content) {
            items.push('\n', content);
        },
        append(content) {
            items.push(content);
        },
        render() {
            return items.join('').trim();
        },
    };
};
