var SlotMachine = require('../fun-stuff/slot-machine/SlotMachine'),
	slotRenderer = require('../fun-stuff/slot-machine/SlotRenderer'),
	WinChecker = require('../fun-stuff/slot-machine/WinChecker'),
	config = require('../config').commands.slotMachine;

var slotMachine = new SlotMachine(config.machine.options, config.machine.slots),
	winChecker = new WinChecker(config.winConditions);

function slotMachineAction(event){
	var result = slotMachine.spin(),
		username = event.base.user["display-name"],
		message = slotRenderer.renderForChat(result) + " <- " + username;

	event.base.responder(message);
	winChecker.check(result, username, function(winCondition, conditionMessage){
		event.base.responder(conditionMessage);
	});
}

module.exports = slotMachineAction;