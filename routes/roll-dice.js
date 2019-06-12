const StringResponse = require('../lib/StringResponse');

function rollDie (size) {
    return Math.ceil(Math.random() * size);
}

function rollDice (amount, size) {
    let result = [];
    for (let rollNumber = 0; rollNumber < amount; rollNumber++) {
        result.push(rollDie(size));
    }
    return result;
}

module.exports = {
    example: '.4d20 + 2',
    description: 'Rolls dice in the form "*d* [+/-] *", where * is an integer. Shorthand "d*" to roll just 1.',
    pattern: /^\.(?<amount>\d+)?d(?<size>\d+)\s?(?<suffix>(?<suffixType>[+-])\s?(?<suffixAmount>\d+))?$/i,
    controller ({ message, data }) {
        const groups = data.groups;
        const amount = parseInt(groups.amount || 1, 10);
        const size = parseInt(groups.size || 20, 10);

        const result = rollDice(amount, size);
        const sum = result.reduce((sum, roll) => sum + roll);

        const response = StringResponse();

        response.append(
            result
                .map((roll) => {
                    if (roll === 1 || roll === size) {
                        return `**${roll}**`;
                    }
                    return roll;
                })
                .join(', ')
        );

        if (amount !== 1) {
            response.line(` = ${sum}`);
        }

        if (groups.suffix) {
            const suffixAmount = parseInt(groups.suffixAmount, 10);
            const suffixType = groups.suffixType;
            const subtotal = suffixType === '+' ? sum + suffixAmount : sum - suffixAmount;
            response.append(` (${suffixType} ${suffixAmount} = ${subtotal})`);
        }

        message.channel.send(response.render());
    }
};
