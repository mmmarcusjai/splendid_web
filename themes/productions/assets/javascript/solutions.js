$(document).ready(function() {
    $('.menu-icon').click(function(){
		$(this).toggleClass('change');
        $('nav').toggleClass('active');
        if($(this).hasClass('change')) {
            $('.menu-text').text('close');
        } else {
            $('.menu-text').text('menu');
        }
	});
});
