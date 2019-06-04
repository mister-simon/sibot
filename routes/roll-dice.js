const StringResponse = require('../lib/StringResponse');

function rollDie(size) {
    return Math.ceil(Math.random() * size);
}

function rollDice(amount, size) {
    let result = [];
    for (let rollNumber = 0; rollNumber < amount; rollNumber++) {
        result.push(rollDie(size));
    }
    return result;
}

module.exports = {
    pattern: /^\.(?<amount>\d+)?d(?<size>\d+)\s?(?<suffix>(?<suffixType>[\+\-])\s?(?<suffixAmount>\d+))?$/i,
    callback({ message, data }) {
        const groups = data.groups;
        const amount = parseInt(groups.amount || 1, 10);
        const size = parseInt(groups.size || 20, 10);
        
        const result = rollDice(amount, size);
        const sum = result.reduce((sum, roll) => sum + roll);

        const rolls = result.map((roll) => {
            if (roll === 1 || roll === size) {
                return `**${roll}**`;
            }
            return roll;
        }).join(', ');

        const response = StringResponse();
        response.append(rolls);

        if (amount !== 1) {
            response.line(` = ${sum}`);
        }

        if (groups.suffix) {
            const suffixAmount = parseInt(groups.suffixAmount);
            const suffixType = groups.suffixType;
            const subtotal = suffixType === "+" ? sum + suffixAmount : sum - suffixAmount;
            response.append(` (${suffixType} ${suffixAmount} = ${subtotal})`);
        }

        message.channel.send(response.render());
    }
}