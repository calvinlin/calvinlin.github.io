///////////////////////////////////////////////////////////////////////////////////////////////////
// SPLIT
///////////////////////////////////////////////////////////////////////////////////////////////////
// Created By: 		Calvin
// Initial Launch: 	1/7/17
// Last Updated: 	5/3/20
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

var isMobilePhone = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobilePhone = true;})(navigator.userAgent||navigator.vendor||window.opera);

$(function() {
	initEvents();

	$('#share_modal').hide();

	if(isMobilePhone) {
		$('#subTitle').html('i hope this works.');
	}

	var qsp = window.location.search;
	if(qsp.length > 0) {
		qsp = decodeURIComponent(qsp.substr(1));

		if(qsp.indexOf('d=') > -1) {
			generateSave(qsp.split('d=')[1].split('&')[0]);
		}
	}

	aprilFools();
});

var formIsValid = true;

function initEvents() {
	$('#addPerson').on('click', function() {
		$('.newPerson').clone().removeClass('newPerson').addClass('person').insertBefore('.newPerson');
		updateAll();
	});

	$('#personTable').on('click', '.deletePerson', function() {
		if($('.person').length > 1) 
			$(this).parent().parent().remove();
		updateAll();
	});

	$(document).on('input', 'input.num', function() {
		console.info('input:\t' + $(this).val());
		if(calcInput($(this).val())){
			$(this).removeClass('invalidInput');
			updateAll();
		}
		else
			$(this).addClass('invalidInput');
	});

	$(document).on('blur', 'input.num', function() {
		var v = $(this).val();
		$(this).attr('istr', v);

		if(!calcInput(v))
			$(this).addClass('invalidInput');

		else {
			$(this).removeClass('invalidInput');
			$(this).val(calcInput(v));
		}

		updateAll();
	});

	$(document).on('focus','input.num',  function() {
		if(!$(this).hasClass('invalidInput')) 
			$(this).val($(this).attr('istr'));
	});

	$(document).on('click', '#reset', function() {

		if(confirm('Are you sure you want to reset?')) {
			$('.person').remove();
			$('#addPerson').click();

			$('#tax').val('').attr('istr', '');
			$('#tip').val('').attr('istr', '');
			$('#credits').val('').attr('istr', '');
		}
	});

	$(document).on('click', '#save', function() {
		saveInfo(prompt('Enter a name to save data under:'));
	});

	$(document).on('click', '#recall', function() {
		readInfo(prompt('Enter a name to recall data:'));
	});

	$(document).on('click', '#share', function() {
		var url = 'https://api.qrserver.com/v1/create-qr-code/?data=';
		url += window.location.href + '?d=' + generateData();
		url += '&amp;size=50x50';
    	$('#barcode').attr('src', url);

    	$('#share_modal').fadeIn();
	});

	$(document).on('click', '#share_close', function() {
		$('#share_modal').fadeOut();
	});

	$(document).on('click', '#share_email', function() {
		var email 	= '';
		var subject = 'Food Invoice: - Restaruant Name (' + getDate() + ')';
		var body 	= 'content goes here?';
		var contents = 'mailto:' + email + '?subject=' + subject + '&body=' + body

		$('<iframe id="emailFrame" src="' + contents + '">').appendTo('body').css("display", "none");
		$('#emailFrame').remove();
	});
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

function aprilFools() {
	var d = new Date();
	var mm = d.getMonth();
	var dd = d.getDate();
	
	if(mm == 3 && dd == 1)
		$('#container').css('transform', 'rotate(120deg)');
}


///////////////////////////////////////////////////////////////////////////////////////////////////

//converts string to a float rounded to the 100th
function convFloat(val) {
	var num = parseFloat(val);
	return isNaN(num) ? 0 : Math.round(num * 100) / 100;
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
