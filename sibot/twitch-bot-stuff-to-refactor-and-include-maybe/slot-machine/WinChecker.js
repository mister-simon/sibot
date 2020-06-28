var slotRenderer = require('./SlotRenderer');

function WinChecker (winConditions) {
    this.winConditions = winConditions;
}

WinChecker.prototype.check = function (result, user, callback) {
    var resultArray = slotRenderer.resultToArray(result);
    var formattedResult = resultArray.join(',') + ',';
    var current;

    for (var i = 0, l = this.winConditions.length; i < l; i++) {
        current = this.winConditions[i];
        if (current.regex.test(formattedResult)) {
            callback(current, current.getMessage(resultArray, user));
            return;
        }
    }
};

module.exports = WinChecker;
