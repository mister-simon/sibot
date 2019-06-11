const MessageRouter = require('./lib/MessageRouter');

// Create the router
const router = MessageRouter();

// Matches an amount of dice with a given size
router.add(require('./routes/roll-dice'));

module.exports = router;