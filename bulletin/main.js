function init() {
	var doc = new jsPDF({
		orientation: 'l',
		unit: 'in',
		format: 'letter'
	});
	doc.setFont('helvetica');

	setDates();
	setDefaults();
	setEvents();
	generateView(doc);

}

var dl = {
	ss 			: window.sessionStorage,							//because typing out the whole thing sucks
	gSS			: (a)=>{return dl.ss[a] ? dl.ss[a] : ''},			//gets the requested parameter from ss

	ls 			: window.localStorage,								//ditto
	gLS			: (a)=>{return dl.ss[a] ? dl.ss[a] : ''},			//more ditto (also a mercedes)

	debug 		: (s)=>{dl.ss['DB'] = s},							//set this to true to enable debug output in console
	DB 			: (s)=>{if(dl.gSS('DB') =='true')console.info(s)},	//dl.db('asdf') ==> outputs 'asdf' in console

	gV 			: (s)=>{return ($('#'+s).length>0)?$('#'+s).val().trim():'ERROR'},	//gets element value

	date 		: []
};


function setDates() {
	formatDate 		= (d) => {return (d.getMonth()+1) + '/' + (d.getDate()) + '/' + (d.getFullYear()+1).toString().substring(2,4);};

	getMonth		= (m) => {
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
	};

	//https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
	getDateSuffix	= (i) => {
		var j = i % 10,	k = i % 100;
		if (j == 1 && k != 11) return i + "st";
		if (j == 2 && k != 12) return i + "nd";
		if (j == 3 && k != 13) return i + "rd";
		return i + "th";
	}

	dl.date['p2']	= new Date();
	dl.date['p1']	= new Date();
	dl.date['now']	= new Date();
	dl.date['n1']	= new Date();

	// https://stackoverflow.com/a/1579109
	dl.date['now'].setDate(dl.date['now'].getDate() + (6+(7-dl.date['now'].getDay())) % 7);	//current/upcoming saturday

	dl.date['p2'].setDate(dl.date['now'].getDate() - 14);	//last last saturday
	dl.date['p1'].setDate(dl.date['now'].getDate() - 7);	//last saturday
	dl.date['n1'].setDate(dl.date['now'].getDate() + 7);	//next saturday

	dl.date['lm'] = getMonth(dl.date['now'].getMonth()-1);	//last month

	//full date
	dl.date['fd'] = getMonth(dl.date['now'].getMonth()) + ' ' 
					+ getDateSuffix(dl.date['now'].getDate()) + ', ' 
					+ dl.date['now'].getFullYear();

	//debug output
	dl.DB('prev2Week:\t' + formatDate(dl.date['p2']) + '\n');
	dl.DB('prevWeek:\t' + formatDate(dl.date['p1']) + '\n');
	dl.DB('thisWeek:\t' + formatDate(dl.date['now']) + '\n');
	dl.DB('nextWeek:\t' + formatDate(dl.date['n1']) + '\n');
	dl.DB('fullDate:\t' + dl.date['fd'] + '\n');
}


function setDefaults() {
	//set date fields
	$('#monthName').val(dl.date['lm']);
	$('#date2Name').val(formatDate(dl.date['p1']));
	$('#date1Name').val(formatDate(dl.date['p2']));

	var pastor = 'Pastor David Lee';
	$('#welcomeName').val(pastor);
	$('#holyCommunion').val(pastor);
	$('#pastor').val(pastor);
	$('#worshipTeam').val('Worship Team');
}


function setEvents() {
	//sets functionality to regenerate doc
	$('#formSubmit').on('click', function() {
		doc = new jsPDF({
			orientation: 'l',
			unit: 'in',
			format: 'letter'
		});

		generateView(doc);
	});

	//set clear button functionality
	$('.a_clear').on('click', function() {
		var id = $(this).attr('id').charAt(2);
		$('#A_'+id+'t').val('');
		$('#A_'+id+'d').val('');
	});
}

$(document).ready(init);
	



