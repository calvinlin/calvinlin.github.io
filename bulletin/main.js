function init() {
	var doc = new jsPDF({
		orientation: 'l',
		unit: 'in',
		format: 'letter'
	});

	initForm();
	
	//gen_OrderOfWorship(doc);
}

var now = new Date();
var prev2Week = new Date();
var prevWeek = new Date();
var thisWeek = new Date();
var nextWeek = new Date();
var lastMonth = '';

function initForm() {
	initDates();
}


function initDates() {
	formatDate = (d)=>{return (d.getMonth()+1) + '/' + (d.getDate()) + '/' + (d.getFullYear()+1).toString().substring(2,4);}

	//https://stackoverflow.com/questions/1579010/get-next-date-from-weekday-in-javascript
	prev2Week.setDate(now.getDate() - 14 + (6+(7-now.getDay())) % 7);
	prevWeek.setDate(now.getDate() - 7 + (6+(7-now.getDay())) % 7);
	thisWeek.setDate(now.getDate() + (6+(7-now.getDay())) % 7);
	nextWeek.setDate(now.getDate() + 7 + (6+(7-now.getDay())) % 7);

	lastMonth = ((m) => {
		switch(m) {
			case 0	: return "January"; 	break;
			case 1	: return "February";	break;
			case 2	: return "March";		break;
			case 3	: return "April";		break;
			case 4	: return "May";			break;
			case 5	: return "June";		break;
			case 6	: return "July";		break;
			case 7	: return "August";		break;
			case 8	: return "September";	break;
			case 9	: return "October";		break;
			case 10	: return "November";	break;
			case 11	: return "December";	break;
			default : return "UNKNOWN??";	break;
		}
	})(now.getMonth()-1);


	$('#monthName').val(lastMonth);
	$('#date2Name').val(formatDate(thisWeek));
	$('#date1Name').val(formatDate(nextWeek));
}

https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}



$(document).ready(init);
	



