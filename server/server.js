const express = require('express');
const path = require('path');
const sibotRouter = require('../sibot/router');
const art = require('../sibot/lib/sibot-intro/art');

module.exports = ({ PORT }) => {
    const sibotRoutes = sibotRouter.list({ isOwner: true, isSelf: false });

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
        .listen(PORT, () => console.log(`Listening on ${PORT}`));
};
