var video = $('#my-video');
var ele_window = $(window);

window.onscroll = () => {
    // Navbar
    if(this.scrollY >= document.querySelector('.about').offsetTop) {
        $('#layout-header').addClass('active');
    } else {
        $('#layout-header').removeClass('active');
    }
    // How we work
    if(this.scrollY > document.querySelector('.how-we-work').offsetTop) {
        $('.description-block').addClass('roll-in-blurred-left');
    }
};


window.onresize = () => {
    // var videoWidth = video.width();
    // var windowWidth = ele_window.width();
    // marginLeftAdjust =   (windowWidth - videoWidth) / 2;
    //
    // video.css({
    //     'left' : marginLeftAdjust
    // });
}

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

    $('.description-block').on('mouseover', function() {
        $(this).addClass('active');
    })

    $('.description-block').on('mouseout', function() {
        $(this).removeClass('active');
    })

    const { NormalParallax } = MiniParallax;

    new NormalParallax('.js-parallax');
});
