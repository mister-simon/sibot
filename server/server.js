const express = require('express');
const path = require('path');
const sibotRouter = require('../sibot/router');
const art = require('../sibot/lib/sibot-intro/art');

module.exports = ({ PORT, SERVER_URL }) => {
    const sibotRoutes = sibotRouter.list();

    return express()
        .use(express.static(path.join(__dirname, 'public')))
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'ejs')
        .get('/', (req, res) =>
            res.render('pages/index', {
                sibotAscii: art.intro,
                routes: sibotRoutes,
            })
        )
        .get('/ping', (req, res) => res.sendStatus(200))
        .listen(PORT);
};
