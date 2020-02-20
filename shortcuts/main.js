
$(document).ready(function() {
	$('a').each(function() {
		$(this).attr('target', '_blank');
	});

	$('a[href*="file://"]').on('click', function(e) {
		e.preventDefault();
		copyText($(this).attr('href'));
		alert('File directory has been copied to clipboard, paste in address bar of file explorer to continue.');
	});

	aprilFools();
});

//unused, maybe for future?
function copyText(str) {
	if(typeof(str) == 'string' && str.length > 0) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(str).select();
		document.execCommand("copy");
		$temp.remove();
	} 
	else {
		console.warn('empty or non-string values cannot be copied');
	}
}

// :)
function aprilFools() {
	var d = new Date();
	var mm = d.getMonth();
	var dd = d.getDate();
	
	if(mm == 3 && dd == 1)
		$('#content').css('transform', 'rotate(120deg)');
}