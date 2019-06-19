module.exports = {
    example: '.activity being a good robot',
    description: 'Set Sibot\'s activity "Playing ..."',
    pattern: /^\.activity (?<activity>.+)/,
    authorise: ({ isOwner }) => isOwner,
    controller ({ message, data }) {
        message.client.user.setActivity(data.groups.activity);
        message.channel.send("Yeah, I'm totally doing that!");
    }
};
