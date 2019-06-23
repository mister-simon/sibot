const { mention } = require('../lib/StringResponseUtils');
const StringResponse = require('../lib/StringResponse');
const responseMap = {};

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
    authorise: ({ isSelf }) => !isSelf,
    async controller ({ message, data, isEdit, oldMessage }) {
        const groups = data.groups;
        const amount = parseInt(groups.amount || 1, 10);
        const size = parseInt(groups.size || 20, 10);

        const result = rollDice(amount, size);
        const sum = result.reduce((sum, roll) => sum + roll);

        const response = StringResponse();

        // @ them
        response.append(mention(message.author) + ' ');

        // Bail early if its a d0.
        if (size === 0) {
            response.append(`I threw ${amount} no-sided ${amount === 1 ? 'die' : 'dice'}. But ${amount === 1 ? 'it' : 'they'} never landed...`);
            message.channel.send(response.render());
            return;
        }

        // List all their rolls, highlighting crits + fails
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

        // Sum it
        if (amount !== 1) {
            response.line(` = ${sum}`);
        }

        // Append any additions + a subtotal
        if (groups.suffix) {
            const suffixAmount = parseInt(groups.suffixAmount, 10);
            const suffixType = groups.suffixType;
            const subtotal = suffixType === '+' ? sum + suffixAmount : sum - suffixAmount;
            response.append(` (${suffixType} ${suffixAmount} = ${subtotal})`);
        }

        console.log(responseMap, arguments);

        // Send it
        if (isEdit === false) {
            const reply = await message.channel.send(response.render());
            responseMap[message.id] = reply;
            return;
        }


        // Update our old message?
        if (responseMap[oldMessage.id] !== undefined) {
            responseMap[oldMessage.id].edit(response.render());
        }
    }
};
