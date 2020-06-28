# Sibot

A new bot to do some things and stuff, you know.

[Add Sibot to your server?](https://discordapp.com/oauth2/authorize?client_id=185587594673782794&scope=bot) (Note - They're likely to only be live when I'm working on 'em.)

## Make it your own?

-   Feel free to clone this repo and tinker with it however you like.
-   I'm just working on this for fun, so don't expect it to suit your needs.
-   If you do make it do something cool though, I guess send a pull request this way?

## Setup

1. `npm i`
1. Copy `.env.example` to `.env` and update values appropriately. Or pass env variables directly to the application when starting the application.
    - Go to the [Discord Developers place + set up a bot](https://discordapp.com/developers/applications/).
1. Update `config.json` if you want to tinker with other static bot options.
1. Find your bot's client id + add your bot to your server
    - `https://discordapp.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot`
1. `node index.js`
    - Alternately install `nodemon` and run `nodemon index.js` to keep the server alive / restarting during local development.
    - Visit the local server `localhost:8888`, or tweak your `PORT` in `.env`.
1. In your server type `.help`
    - Or visit [Sibot's current server location](https://discord-sibot.herokuapp.com/) for more info.
    - Alternately, look at `sibot/router.js` to see available commands.
