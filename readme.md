# Sibot

A new bot to do some things and stuff, you know.

[Add Sibot to your server?](https://discordapp.com/oauth2/authorize?client_id=185587594673782794&scope=bot) (Note - They're likely to only be live when I'm working on 'em.)

## Setup

1. `npm i`
1. Copy `.env.example` to `.env` and update values appropriately. Or pass env variables directly to the application when starting the application.
    - Go to the [Discord Developers place + set up a bot](https://discordapp.com/developers/applications/).
1. Update `config.json` if you want to tinker with other static bot options.
1. Find your bot's client id + add your bot to your server
    - `https://discordapp.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot`
1. `node index.js`
1. In your server type `.help`
    - Alternately, look at `sibot/router.js` to see available commands.
