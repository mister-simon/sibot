/* SlotMachine Class

	Example Parameters

	Array choices
		- Array of objects, each with data "value" and "weight"
		- E.g. [
			{
				value: { name: "dfsrank" },
				weight: 5
			},
			{
				value: { name: "dfapple" },
				weight: 15
			},
			{
				value: { name: "WorthIt" },
				weight: 45
			},
			{
				value: { name: "HeyGirls" },
				weight: 55
			},
			{
				value: { name: "NiceMan" },
				weight: 60
			},
			{
				value: { name: "UrKidding" },
				weight: 65
			}
		],
	Int slots
		- Number of times to spin
		- E.g. 3 = ["HeyGirls","UrKidding","UrKidding"]
*/
function SlotMachine (choices, slots) {
    this.slots = slots;

    this.choices = [];
    this.choiceBoundaries = [];
    this.upperBoundary = 0;

    this.setData(choices);
}

// - Iterates through the dataset
// - Pushes all the choices with non-zero weight into class' choices store
// - Calls to calculate the boundaries between the weights

SlotMachine.prototype.setData = function (choices) {
    var current;

    for (var i = 0, l = choices.length; i < l; i++) {
        current = choices[i];

        if (current.weight !== 0) {
            this.choices.push(current);
        }
    }

    this.calculateBoundaries();
};

// Calculates the boundaries for our dataset
// (We eventually want to call for a random number between 0 and our uppermost-boundary
//		where the uppermost-boundary is the sum of all the weights in our dataset)
// - Iterates through choices
// - Creates an array of choiceBoundaries (given example data above, creates something like [0, 5, 20, ... etc ..., 180])
// - Stores the uppermost boundary (sum of all weights - example data should give 245)
SlotMachine.prototype.calculateBoundaries = function () {
    var total = 0;
    this.choiceBoundaries.length = 0;
    this.upperBoundary = 0;

    for (var i = 0, l = this.choices.length; i < l; i++) {
        this.choiceBoundaries.push(total);
        total += this.choices[i].weight;
    }

    this.upperBoundary = total;
};

SlotMachine.prototype.spin = function () {
    var results = [];

    for (var i = 0; i < this.slots; i++) {
        console.log('-------SPIN-' + i + '--------');
        results.push(this.randomiseSlot());
        console.log('-------SPIN-' + i + '--------');
    }

    return results;
};

// Creates a random number between 0 - upperBoundary;
// - Iterates through choiceBoundaries
// 	- As soon as boundary > random number
//	- Use the index to return the relevant choice object
SlotMachine.prototype.randomiseSlot = function () {
    var randomNumber = Math.random() * this.upperBoundary;
    var choice;
    var current;

    for (var i = 0, l = this.choiceBoundaries.length; i < l; i++) {
        current = this.choiceBoundaries[i];

        console.log(randomNumber, current);
        console.log(current <= randomNumber);
        console.log('---------------');

        if (current <= randomNumber) {
            choice = this.choices[i];
        } else {
            break;
        }
    }

    return choice;
};

module.exports = SlotMachine;
