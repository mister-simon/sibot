const MessageRouter = require('./lib/MessageRouter');

// Create the router
const router = MessageRouter();

// Pass the router to the help route to allow it to list other routes.
router.add(require('./routes/help')(router));

// Owner routes
router.add(require('./routes/setActivity'));
router.add(require('./routes/setProfile'));
router.add(require('./routes/say'));

// General routes
router.add(require('./routes/roll-dice'));
router.add(require('./routes/ping'));

// Minecraft routes
router.add(require('./routes/overworld-to-nether'));
router.add(require('./routes/nether-to-overworld'));

// Fallback route, catches all
router.add(require('./routes/any'));

module.exports = router;
