

function saveInfo(n) {

	localStorage.setItem(n, generateData());
}


function readInfo(k) {

	if(typeof k !== 'string') {
		alert('invalid key!');
		return false;
	}

	if(typeof localStorage.getItem(k) !== 'string') {
		alert('data not found!');
		return false;
	}

	generateSave(localStorage.getItem(k));

}

function generateData() {
	var data = '';

	data += getDate() + '%%';

	data += $('#tax').val() + ':';
	data += $('#tip').val() + ':';
	data += $('#credits').val();
	data += '%%';
	
	$('.person').each(function() {
		data += $(this).find('.personName').val() + ':';
		data += $(this).find('.itemCost').val() + ':';
		data += $(this).find('.addlCost').val() + ':';
		data += $(this).find('.addlCost').val();
		data += '$$';
	});

	//remove trailing '$$'
	return data.slice(0, -2);
}

function generateSave(data) {

	if(data.indexOf('%%') == -1 && data.indexOf('$$') == -1) {
		alert('data invalid!');
		return false;
	}

	data = data.split('%%');

	var date = data[0];
	var fees = data[1].split(':');
	var people = data[2].split('$$');

	$('#tax').val(fees[0]);
	$('#tip').val(fees[1]);
	$('#credits').val(fees[2]);

	//reset people table
	$('.person').remove();

	var pInd = 1;
	do {
		$('#addPerson').click();
		var person = people[pInd-1].split(':');

		var row = $('.person:nth-child(' + pInd + ')');
		row.find('.personName').val(person[0]);
		row.find('.itemCost').val(person[1]);
		row.find('.addlCost').val(person[2]);
		row.find('.addlCost').val(person[3]);
	} while (++pInd <= people.length)

	updateAll();
}