module.exports = function StringResponse() {
    let items = [];

    return {
        line(content) {
            items.push("\n", content);
        },
        append(content) {
            items.push(content);
        },
        render() {
            return items.join('').trim();
        }
    };
};