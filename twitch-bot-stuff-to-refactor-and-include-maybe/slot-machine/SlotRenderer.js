function resultToArray(result){
	var resultArray = [];

	for (var i = 0, l = result.length; i < l; i++) {
		resultArray.push(result[i].value.name);
	}

	return resultArray;
}

function renderForChat(result){
	var emotes = resultToArray(result);

	return ["[", emotes.join(" | "), "]"].join(" ");
}

module.exports = {
	resultToArray: resultToArray,
	renderForChat: renderForChat
};