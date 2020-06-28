const StringResponse = require('../lib/StringResponse');

let channelArray;
let selectedChannel = null;
let responseMap = {};

function cacheChannelArray(client) {
    channelArray = client.channels
        .filter((channel) => {
            return channel.type === 'text' || channel.type === 'dm';
        })
        .array();
}

function channelDescriptor(channel) {
    switch (channel.type) {
        case 'text':
            return `${channel.guild.toString()} - ${channel.toString()}`;
        case 'dm':
            return `${channel.recipient.username} - DM`;
    }
}

module.exports = {
    example: '.say 1 "Hello world!"',
    description: '[Owner] Use ".say" to list channels. Select a channel by specifying a number. Provide a string quote to say. Omit the number to send to previously selected channel.',
    pattern: /^\.say(\s(?<channel>(\d+|-1)))?(\s"(?<text>[^"]+)")?/,
    authorise: ({ isOwner }) => isOwner,
    async controller({ message, data, isEdit, oldMessage }) {
        const channel = data.groups.channel || null;
        const text = data.groups.text || null;

        // If no message / options then redo the options
        if (channelArray === undefined || (channel === null && text === null) || channel === '-1') {
            cacheChannelArray(message.client);

            if (channel === -1) {
                selectedChannel = null;
            }
        }

        const response = StringResponse();

        // If valid channel is passed
        if (channel !== null && channelArray[channel] !== undefined) {
            selectedChannel = parseInt(channel, 10);
        }

        if (text === null) {
            // if no message then spam options, highlight selected one
            channelArray.forEach((channel, index) => {
                const boldChannel = index === selectedChannel ? '**' : '';
                response.line(`\`[${index}]\` - ${boldChannel}${channelDescriptor(channel)}${boldChannel}`);
            });
        } else if (selectedChannel !== null) {
            // Send it
            if (isEdit && responseMap[oldMessage.id] !== undefined) {
                responseMap[oldMessage.id].edit(text);
                response.line(`I updated the previous message to "${text}" in \`${channelDescriptor(oldMessage.channel)}\``);
            } else {
                const recipient = channelArray[selectedChannel];
                const reply = await recipient.send(text);
                responseMap[message.id] = reply;
                response.line(`I said "${text}" to \`${channelDescriptor(recipient)}\``);
            }
        } else {
            response.line("Can't send a message until you select a channel...");
        }

        message.channel.send(response.render());
    },
};
