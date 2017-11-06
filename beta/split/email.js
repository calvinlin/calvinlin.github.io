//-----------------------------------------------------------------------------

function showName() {
	$('.personName').removeClass('hide');
	$('.personEmail').addClass('hide');

	$('#toggleField').html('Name');
}

function showEmail() {
	$('.personEmail').removeClass('hide');
	$('.personName').addClass('hide');

	$('#toggleField').html('Email');
}

//-----------------------------------------------------------------------------

$(document).on('click', '#toggleLink', function() {
	($('#toggleField').html() == 'Name') ? showEmail() : showName();
});


$(document).on('click', '#notify', function() {

	if(!emailInputsValid()) return 0;
	console.log('here');

	var eArr = [];
	$('.person').each(function(){
		eArr.push($(this).attr('pEmail'));
	});

	var gen = '';
	gen += 'mailto:' + eArr.join(',');
	gen += '?subject=SPLIT - ' + getDate();
	gen += '&body=' + 'Feature still in development :(';

	//window.location.href = gen;
});


function getDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yy = today.getFullYear().toString().substring(1,3);

	dd = (dd<10) ? '0'+dd : dd;
	mm = (mm<10) ? '0'+mm : mm;

	return mm+'/'+dd+'/'+yy;
}


function emailInputsValid() {
	var retVal = true;

	$('.person .personEmail').each(function(){
		var emailInput = $(this).val();
		if(!emailInput || emailInput.indexOf('@') == -1 || emailInput.indexOf('.') == -1)
			retVal = false;
	});

	console.info('Notify was clicked --> ' + retVal);

	return retVal;
}