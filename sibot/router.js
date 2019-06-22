const MessageRouter = require('./lib/MessageRouter');

// Create the router
const router = MessageRouter();

// Pass the router to the help route to allow it to list other routes.
router.add(require('./routes/help')(router));

// Owner routes
router.add(require('./routes/setActivity'));
router.add(require('./routes/setProfile'));

// General routes
router.add(require('./routes/roll-dice'));
router.add(require('./routes/ping'));

// Fallback route, catches all
router.add(require('./routes/any'));

module.exports = router;
