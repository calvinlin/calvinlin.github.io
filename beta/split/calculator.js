


function calcInput(str) {

	var temp = str.split(' ').join('');				//removes all white spaces

	if(!isNaN(temp)) return temp;					//if it's already a number, return that number
	if(!isNaN(temp.toString())) return false;

	var sumArr = temp.split('+');					//splits the string by '+' to get all number involved
	for(var i = 0; i < sumArr.length; i++) {		//for each number
		if(isNaN(sumArr[i])) return false;			//exit if current string is not a number
		else sumArr[i] = parseFloat(sumArr[i]);		//convert string to number
	}

	return recSum(sumArr);
}

function recSum(arr) {
	return (arr.length === 0) ? 0 : arr[0] + recSum(arr.slice(1));
}
