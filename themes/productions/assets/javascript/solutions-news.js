// Update language selector on menu bar
let lanSelector = document.querySelectorAll('.language-selector p a');
lanSelector.forEach(function(lan){
    currLan = lan.dataset.lanselector;
    targetHref = `${base_url}/${currLan}/${newsPage}/${newsId}`;
    lan.setAttribute('href', targetHref);
});

$(document).ready(function() {
    $('.menu-icon').click(function(){
        $(this).toggleClass('change');
        $('nav').toggleClass('active');
        $('.side-wrapper').toggleClass('active');
        if($(this).hasClass('change')) {
            $('.menu-text').text('');
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
