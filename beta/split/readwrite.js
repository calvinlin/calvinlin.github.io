

function saveInfo() {

	var pStr = '';
	var tStr = '';
	var saveName = prompt('Enter a name to save data under:');

	pStr += $('#subTotal').text() + ':';
	pStr += $('#tax').text() + ':';
	pStr += $('#tip').text() + ':';
	pStr += $('#credits').text() + ':';
	pStr += $('#total').text() + '$$';
	
	$('.person').each(function() {
		var p = $(this).find('.personName').text();
		var i = $(this).find('.itemCost').text();
		var a = $(this).find('.addlCost').text();
		var t = $(this).find('.addlCost').text();

		cStr += p+':'+i+':'+a+':'+t+'$$';
	});

	var currTime = new Date();
	var expTime = new Date();
	expTime = currTime.getTime() + 86400000*90;	//will need to convert to UTC time?



	document.cookie = 'personData=' + cStr + ';exp=' + expTime.toUTCString();
	document.cookie = 'tableData=' + tStr + ';exp=' + expTime.toUTCString();
}




