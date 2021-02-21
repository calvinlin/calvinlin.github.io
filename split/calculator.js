

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


///////////////////////////////////////////////////////////////////////////////////////////////////

function updateAll() {
	// var f = false;

	// $('input[type="number"]').each(function() {

	// 	var val = calcInput($(this).val());
	// 	if(isNan($(this).val()) && !val) 
	// 		break;
	// });

	updateSubTotal();
	updateTotal();
	updatePercentCost();
	updateAddlCost();
	updateIndividualTotal();
}


///////////////////////////////////////////////////////////////////////////////////////////////////

function updateIndividualTotal() {
	$('.person').each(function() {
		var total 		= 0;
		var indivCost 	= $(this).find('.itemCost').val();
		var addlCost 	= $(this).find('.addlCost').val();

		total += (indivCost == '') 	? 0 : convFloat(indivCost);
		total += (addlCost == '')	? 0 : convFloat(addlCost);
		$(this).find('.individualTotal').val(convFloat(total));
	});
}

function updateSubTotal() {
	var subTotal = 0;

	$('.person .itemCost').each(function() {
		subTotal += convFloat($(this).val().trim());
	});

	$('#subTotal').val(convFloat(subTotal));
}

function updateTotal() {
	var total 		= 0;
	var subTotal 	= $('#subTotal').val();
	var tax 		= $('#tax').val();
	var tip 		= $('#tip').val();
	var credits	 	= $('#credits').val();

	total += (subTotal == '') 	? 0 : convFloat(subTotal);
	total += (tax == '') 		? 0 : convFloat(tax);
	total += (tip == '')		? 0 : convFloat(tip);
	total -= (credits == '') 	? 0 : convFloat(credits);

	$('#total').val(convFloat(total));
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function updatePercentCost() {
	var total = $('#subTotal').val();

	$('.person').each(function() {
		var itemCost = convFloat($(this).find('.itemCost').val());

		$(this).find('.percent').val(itemCost / convFloat($('#subTotal').val()));
	});

}

function updateAddlCost() {
	var tax 		= $('#tax').val();
	var tip 		= $('#tip').val();
	var credits	 	= $('#credits').val();	

	var fees 		= 0;
	fees 			+= (tax == '') 		? 0 : convFloat(tax);
	fees 			+= (tip == '')		? 0 : convFloat(tip);
	fees 			-= (credits == '') 	? 0 : convFloat(credits);

	$('.person').each(function() {
		var percent = convFloat($(this).find('.percent').val());

		$(this).find('.addlCost').val(convFloat(percent * fees));
	});
}