var SlotMachine = require('../fun-stuff/slot-machine/SlotMachine');
var slotRenderer = require('../fun-stuff/slot-machine/SlotRenderer');
var WinChecker = require('../fun-stuff/slot-machine/WinChecker');
var config = require('../config').commands.slotMachine;

var slotMachine = new SlotMachine(config.machine.options, config.machine.slots);
var winChecker = new WinChecker(config.winConditions);

function slotMachineAction (event) {
    var result = slotMachine.spin();
    var username = event.base.user['display-name'];
    var message = slotRenderer.renderForChat(result) + ' <- ' + username;

    event.base.responder(message);
    winChecker.check(result, username, function (winCondition, conditionMessage) {
        event.base.responder(conditionMessage);
    });
}

module.exports = slotMachineAction;
