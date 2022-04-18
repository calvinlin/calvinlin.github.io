

$(document).ready(function() {
	$('a').each(function() {
		$(this).attr('target', '_blank');
	});

	$(document).on('keyup', function(e){
		if(e.which == 67)
			$('.hiddenLink').show();
	});

	//$('a[href*="file://"]').on('click', function(e) {
	$('.copy a').on('click', function(e) {
		e.preventDefault();
		copyText($(this).attr('href'));
		alert('File directory has been copied to clipboard, paste in address bar of file explorer to continue.');
	});

	fancyStuff();

	////////// popup window ////////////
	if ($(".moreproductlinks").length) {
		if ($(window).width() > 1100) var x = "900px",
			L = "470px";
		else var x = "95%",
			L = "50%";
		$(".moreproductlinks").colorbox({
			iframe: !0,
			width: x,
			height: L
		})
	}
	////////// End of popup window ////////////

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
function fancyStuff() {
	var d = new Date();
	var mm = d.getMonth();
	var dd = d.getDate();

	//st patricks day
	if(mm == 2 && dd == 17)
		$('#content').addClass('stpatricksday');

	//april fools
	if(mm == 3 && dd == 1)
		$('#content').css('transform', 'rotate(120deg)');

	//christmas
	if(mm == 11)
		$('#content').addClass('christmas');

	if(mm == 10)
		$('#content').addClass('thanksgiving');
}
