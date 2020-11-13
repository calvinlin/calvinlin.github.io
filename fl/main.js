

$(document).ready(function() {
	// when any of club fields get modified, update output field
	$('.clubInput').on('input', function() {
		var inputs = $('.clubInput');
		var str = '';
		for(var i = 0; i < inputs.length; i++) {
			str += inputs[i].value.trim() + '$';
		}
		str = str.substring(0, str.length - 1);
		$('#output').val(str);
	});

	// if output gets modified, modify the coresponding club field
	$('#output').on('input', function() {
		var output = $('#output')[0].value.trim();
		var inputs = $('.clubInput');
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].value = output.split('$')[i].trim();
		}
	});

	function copyToClipboard() {
		/* Get the text field */
		var copyText = document.getElementById("output");

		/* Select the text field */
		copyText.select();
		copyText.setSelectionRange(0, 99999); /*For mobile devices*/

		/* Copy the text inside the text field */
		document.execCommand("copy");
	}

	document.getElementById("copy").addEventListener("click", copyToClipboard);



});
