
$(document).ready(function() {
	$('a').each(function() {
		$(this).attr('target', '_blank');
	});
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