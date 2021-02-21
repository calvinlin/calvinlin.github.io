///////////////////////////////////////////////////////////////////////////////////////////////////
// SPLIT
///////////////////////////////////////////////////////////////////////////////////////////////////
// Created By: 		Calvin
// Initial Launch: 	1/7/17
// Last Updated: 	5/18/17
///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Individual Total Calculation:
//
// 			person's item's cost
//		+	(percentage of item cost to sub total) x (tip + tax)
//		-	(1 / amount of people) x credits
// 		----------------------------------------------------------
//			person's total
//
///////////////////////////////////////////////////////////////////////////////////////////////////


$(function() {
	initEvents();
});

var formIsValid = true;

function initEvents() {
	$('#addPerson').on('click', function() {
		addPerson();
	});

	$('#personTable').on('click', '.deletePerson', function() {
		removePerson($(this));
	});

	$(document).on('input', 'input:not(.personName)', function() {
		checkValidInput($(this));
	});

	$('#feeTable input').on('input', function() {
		updateTotal();
		updateAddlCost();
		updateIndividualTotal();
	});

	$(document).on('input', '.person .itemCost', function() {
		updatePercentCost();
		updateAddlCost();
		updateSubTotal();
		updateIndividualTotal();
	});

	$(document).on('click', 'input[type="button"]', function() {
		alertMessage();
	});

	$(document).on('click', '#notify', function() {
		var email 	= 'SomeRandomEmail@DontSentThis.com';
		var subject = getDate() + '- Restaruant Name (TEST)';
		var body 	= 'Feature still in development :(';

		window.open('mailto:' + email + '?subject=' + subject + '&body=' + body);
	});
}

function alertMessage() {
	alert('Feature still in development :(');
}

function getDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yy = today.getFullYear().toString().substring(2,4);

	dd = (dd<10) ? '0'+dd : dd;
	mm = (mm<10) ? '0'+mm : mm;

	return mm+'/'+dd+'/'+yy;
}


//=================================================================================================

function addPerson() {
	$('.newPerson').clone().removeClass('newPerson').addClass('person').insertBefore('.newPerson');
}

function removePerson(elem) {
	elem.parent().parent().remove();
	updateSubTotal();
	updateTotal();
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//converts string to a float rounded to the 100th
function convFloat(val) {
	var num = parseFloat(val);
	return Math.round(num * 100) / 100;
}

//checks if input is valid, changes input box to red if invalid
function checkValidInput(elem) {
	if(isNaN(elem.val())) {
		formIsValid = false;
		elem.addClass('invalidInput');
	}
	else {
		formIsValid = true;
		elem.removeClass('invalidInput');
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function updateIndividualTotal() {
	// var par = elem.parent().parent();
	// var total = 0;

	// var indivCost = elem.val();
	// var addlCost = par.find('.addlCost').val();

	// total += (indivCost == '') 	? 0 : convFloat(indivCost);
	// total += (addlCost == '')	? 0 : convFloat(addlCost);
	
	// par.find('.individualTotal').val(convFloat(total));



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
	updateTotal();
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
