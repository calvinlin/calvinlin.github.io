var doc = new jsPDF({
	orientation: 'l',
	unit: 'in',
	format: 'letter'
});

//=============================================================================
// Order of Worship
//=============================================================================

//title
doc.setFontSize(17);
doc.text(2.75, 0.5, 'ORDER OF WORSHIP', null, null, 'center');

doc.setFontSize(8.5);
doc.setFontType('italic');
doc.text(2.75, 0.65, 'Saturday November 25, 2017', null, null, 'center');

//left side
doc.setFontSize(11);
doc.setFontType('normal');
doc.text(0.3, 1.2, 'Welcome');
doc.text(0.3, 1.5, 'Singing God\'s Praises');
doc.text(0.3, 1.8, 'Prayer & Giving Back to God*');
doc.text(0.3, 2.1, 'Announcements');
doc.text(0.3, 2.4, 'Sermon');
doc.text(0.3, 3.0, 'Song of Response');
doc.text(0.3, 3.3, 'Benediction');

//right side
doc.setFontType('italic');
doc.text(5.2, 1.2, 'Person Name', null, null, 'right');
doc.text(5.2, 1.5, 'Worship Team', null, null, 'right');
doc.text(5.2, 1.8, 'Someone Else', null, null, 'right');
doc.text(5.2, 2.1, 'Same Person', null, null, 'right');
doc.text(5.2, 2.4, 'Pastor First Last', null, null, 'right');
doc.text(5.2, 3.0, 'Worship Team', null, null, 'right');
doc.text(5.2, 3.3, 'Person Name', null, null, 'right');

//sermon info
doc.setFontType('bolditalic');
doc.setFontSize(12);
doc.text(2.75, 2.6, '"Sermon Title Goes Here!"', null, null, 'center');
doc.setFontSize(9);
doc.setFontType('italic');
doc.text(2.75, 2.75, 'Book 12:34-56', null, null, 'center');

//=============================================================================




//=============================================================================
// Sermon Section
//=============================================================================

//title
doc.setFontType('bold');
doc.setFontSize(15);
doc.text(8.25, 0.5, 'How to Be a Faith Action Hero', 'center');

//verse
doc.setFontType('normal');
doc.setFontSize(11);
doc.text(8.25, 0.7, 'Hebrews 11:8-16', 'center');


//passage
doc.setFontSize(10);
var passage = "8By faith Abraham, when he was called, obeyed by going out to a place which he was to receive for an inheritance; and he went out, not knowing where he was going. 9 By faith he lived as an alien in the land of promise, as in a foreign land, dwelling in tents with Isaac and Jacob, fellow heirs of the same promise; 10 for he was looking for the city which has foundations, whose architect and builder is God. 11 By faith even Sarah herself received ability to conceive, even beyond the proper time of life, since she considered Him faithful who had promised.12 Therefore there was born even of one man, and him as good as dead at that, as many descendants AS THE STARS OF HEAVEN IN NUMBER, AND INNUMERABLE AS THE SAND WHICH IS BY THE SEASHORE.";
passage += "13 All these died in faith, without receiving the promises, but having seen them and having welcomed them from a distance, and having confessed that they were strangers and exiles on the earth. 14 For those who say such things make it clear that they are seeking a country of their own.15 And indeed if they had been thinking of that country from which they went out, they would have had opportunity to return. 16 But as it is, they desire a better country, that is, a heavenly one. Therefore God is not ashamed to be called their God; for He has prepared a city for them.";

passage = doc.splitTextToSize(passage,  4.9);
doc.text(5.8, 1.1, passage);


//=============================================================================

/*
doc.setFont("times");
doc.setFontType("normal");
doc.text(105, 80, 'This is centred text.', null, null, 'center');
doc.text(105, 90, 'And a little bit more underneath it.', null, null, 'center');
doc.text(200, 100, 'This is right aligned text', null, null, 'right');
doc.text(200, 110, 'And some more', null, null, 'right');
doc.text(20, 120, 'Back to left');

doc.text(20, 140, '10 degrees rotated', null, 10);
doc.text(20, 160, '-10 degrees rotated', null, -10);
*/


// $.ajax({
// 	url: 'http://labs.bible.org/api/?passage=John%203:16&type=json',
// 	type: 'GET',
// 	crossDomain: true,
// 	dataType:'jsonp',
// 	success: function(data) {
// 		console.log(data);
// 	},
// 	error: function() {
// 		alert('Failed!');
// 	}
// });



$("#preview").attr("src", doc.output('datauristring'));