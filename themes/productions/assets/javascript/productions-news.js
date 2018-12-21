var news_top = (document.querySelector('.news') != null) ? document.querySelector('.news').offsetTop : '';

window.onresize = () => {
    news_top = document.querySelector('.news').offsetTop;
}

window.onload = () => {
    const nav = document.querySelector('nav');
    var class_name = 'scroll-news';
    nav.className = class_name;
}

$(document).ready(function() {
    $('.news-list-more').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-news-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-news-arrow" id="left"></i>',
    });
})
