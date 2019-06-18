const MessageRouter = require('./lib/MessageRouter');

// Create the router
const router = MessageRouter();

// List the available routes
router.add(require('./routes/help')(router));

// Matches an amount of dice with a given size
router.add(require('./routes/roll-dice'));

// Matches an amount of dice with a given size
router.add(require('./routes/ping'));

// Catch literally any message not matching other routes
router.add(require('./routes/any'));

module.exports = router;
