$(document).ready(() => {
	init();
});


function init() {

	/**
	*	Add smooth scrolling to anchor tags, because the default one sucks.
	*	src: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
	*/
	$(".scrollTrigger").on('click', function(event) {
		event.preventDefault();
	
		var hash = this.hash;
	
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 800, function(){
			window.location.hash = hash;
		});
	});


}

