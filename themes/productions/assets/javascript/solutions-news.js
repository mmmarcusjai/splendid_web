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

    $('.news-list-more').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-news-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-news-arrow" id="left"></i>',
    });
});
