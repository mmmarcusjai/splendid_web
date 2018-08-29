$(document).ready(function() {
    // Contact us
    $('.contact-us .control-btn img').on('click', function() {
        action = $(this).attr('action');
        contactus_slide(action);
    });
})

function contactus_slide(action) {
    if($('.slide-hide[img-display=1]').length == $('.slide-hide').length) {
    	$('.slide-hide').attr('img-display', '0');
    }

    switch(action) {
        case 'next' :
            $('.slide-bottom').removeClass('slide-bottom').addClass('slide-hide');
            $('.slide-main').removeClass('slide-main').addClass('slide-bottom');
            $('.slide-top').removeClass('slide-top').addClass('slide-main');
            $('.slide-hide[img-display=0]').last().removeClass('slide-hide').addClass('slide-top').attr('img-display', '1');
            break;
        case 'prev' :
            $('.slide-top').removeClass('slide-top').addClass('slide-hide');
            $('.slide-main').removeClass('slide-main').addClass('slide-top');
            $('.slide-bottom').removeClass('slide-bottom').addClass('slide-main');
            $('.slide-hide[img-display=0]').last().removeClass('slide-hide').addClass('slide-bottom').attr('img-display', '1');
        break;
    }
    $('.address-detail').addClass('d-none');

    $('.address-detail[id='+ $('.slide-main').data('display') +']').removeClass('d-none');
    // console.log('ID ::: ' + $('.slide-main').attr('id'));
}
