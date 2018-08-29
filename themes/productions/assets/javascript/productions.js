AOS.init();
var home_top = (document.querySelector('.home') != null) ? document.querySelector('.home').offsetTop : '';
var facilities_top = (document.querySelector('.facilities') != null) ? document.querySelector('.facilities').offsetTop : '';
var quality_top = (document.querySelector('.quality-content') != null) ? document.querySelector('.quality-content').offsetTop : '';
var sustainability_top = (document.querySelector('.sustainability') != null) ? document.querySelector('.sustainability').offsetTop : '';
var news_top = (document.querySelector('.news') != null) ? document.querySelector('.news').offsetTop : '';
var contactus_top = (document.querySelector('.contact-us') != null) ? document.querySelector('.contact-us').offsetTop : '';
var vid = (document.querySelector('.facilities video') != null) ? document.querySelector('.facilities video') : '';

var curr_popup_index = 0;
var total_home_popup = $('.home-pin').length;
var home_popup_arr = {
    1: 'pro',
    2: 'du',
    3: 'ct',
    4: 'io',
    5: 'ns',
}
window.onresize = () => {
    home_top = document.querySelector('.home').offsetTop;
    facilities_top = document.querySelector('.facilities').offsetTop;
    quality_top = document.querySelector('.quality-content').offsetTop;
    sustainability_top = document.querySelector('.sustainability').offsetTop;
    news_top = document.querySelector('.news').offsetTop;
    contactus_top = document.querySelector('.contact-us').offsetTop;
    update_nav_class(Math.round(this.scrollY));
}
window.onscroll = () => {
    update_nav_class(Math.round(this.scrollY));
};


$('document').ready(function() {
    // Buddle menu
    $('.bubble-menu .opt , .side-wrapper ul li a').on('click', function() {
        var id = $(this).attr('id');
        switch (id) {
            case 'home':
                to = home_top;
                break;
            case 'facilities':
                to = facilities_top;
                break;
            case 'quality':
                to = quality_top;
                break;
            case 'sustainability':
                to = sustainability_top;
                break;
            case 'news':
                to = news_top;
                break;
            case 'contactus':
                to = contactus_top;
                break;
            default:

        }
        if($('.side-wrapper').hasClass('active')) {
            $('.side-wrapper').removeClass('active');
            $('#nav-icon').removeClass('open');
        }
        $('html, body').animate({
            scrollTop: to
        });
    });

    // Home
    $('.home-pin').on('click', function() {
        var index = $(this).attr('data-index');
        show_home_popup(index);
    });

    $('.close-container').on('click', function() {
        hide_popup();
    });

    $('.popup-arrow').on('click', function() {
        var target = $(this).attr('target');
        change_home_popup_content(target)
    });

    // News
    if(fromDetails && fromDetails != undefined) {
        $('html, body').animate({
            scrollTop: news_top + 9 + 'rem'
        });
    }

    // News popup
    show_news_popup();
    set_session_stroage('news_shown', true);

    $('.news-popup .btn-container #btn-close').on('click', function() {
        hide_news_popup();
    });

    $('.news-popup-main-hex').on('click', function() {
        var position = $(this).data('position');
        news_popup_slider(position);
    });

    $('#nav-icon').click(function(){
		$(this).toggleClass('open');
        if($(this).hasClass('open')) {
            $('.side-wrapper').addClass('active');
        } else {
            $('.side-wrapper').removeClass('active');
        }
	});

    // Active responsive image map
    $('map').imageMapResize();
});

function update_nav_class(scroll_y) {
    scroll_y+=100;
    const nav = document.querySelector('nav');
    var class_name = '';
    $('.bubble-menu .opt').removeClass('active');
    if(scroll_y <= 100) {
        class_name = '';
        $('.bubble-menu .opt .bullet#home').closest('.opt').addClass('active');
        vid.pause();
    } else if(scroll_y >= facilities_top && scroll_y < quality_top) {
        class_name = 'hide';
        $('.bubble-menu .opt .bullet#facilities').closest('.opt').addClass('active');
        vid.play();
    } else if(scroll_y >= quality_top && scroll_y < sustainability_top){
        class_name = 'scroll-quality';
        $('.bubble-menu .opt .bullet#quality').closest('.opt').addClass('active');
        vid.pause();
    } else if(scroll_y >= sustainability_top && scroll_y < news_top) {
        class_name = 'scroll-sustainability';
        $('.bubble-menu .opt .bullet#sustainability').closest('.opt').addClass('active');
        vid.pause();
    } else if(scroll_y >= news_top && scroll_y < contactus_top) {
        class_name = 'scroll-news';
        $('.bubble-menu .opt .bullet#news').closest('.opt').addClass('active');
        vid.pause();
    } else if(scroll_y >= contactus_top ) {
        class_name = 'scroll-contactus';
        $('.bubble-menu .opt .bullet#contactus').closest('.opt').addClass('active');
        vid.pause();
    } else {
        class_name = 'scroll-home';
        $('.bubble-menu .opt .bullet#home').closest('.opt').addClass('active');
        vid.pause();
    }
    // console.log('scrollY :::: ' + scrollY);
    // console.log('sustainability_top ::::: ' + sustainability_top);
    // console.log('class ::::: ' + class_name);
    nav.className = class_name;
}

function show_home_popup(target) {
    $('html, body').css('overflow', 'hidden');
    $('.home-popup').addClass('show-popup');
    change_home_popup_content(target);
}


function change_home_popup_content(target) {
    curr_popup_index = target;
    update_home_popup_target();
    $('.popup-content').addClass('d-none');
    $('.home-popup .popup-base.base-bg').css('background-image', 'url(themes/productions/assets/images/'+target+'_bg.png)');
    $('.popup-content[data-index="'+target+'"]').removeClass('d-none');
}

function update_home_popup_target() {
    prev_index = parseInt(curr_popup_index) - 1;
    next_index = parseInt(curr_popup_index) + 1;
    $('.popup-arrow[id=right-arrow]').attr('target', next_index);
    $('.popup-arrow[id=left-arrow]').attr('target', prev_index);
    if(next_index > total_home_popup) {
        next_index = 1;
        $('.popup-arrow[id=right-arrow]').attr('target', next_index);
    } else if(prev_index == 0) {
        prev_index = total_home_popup;
        $('.popup-arrow[id=left-arrow]').attr('target', prev_index);
    }
}

function hide_popup() {
    $('html, body').css('overflow', 'visible');
    $('.home-popup').removeClass('show-popup');
}

function show_news_popup() {
    var get_show = get_session_stroage('news_shown');
    if(!get_show) {
        $('html, body').css('overflow', 'hidden');
        $('.news-popup').removeClass('inactive');
    }
}

function hide_news_popup() {
    $('html, body').css('overflow', 'visible');
    $('.news-popup').addClass('inactive');
}

function news_popup_slider(position) {
    if($('.details-img-hide[img-display=1]').length == $('.details-img-hide').length) {
        $('.details-img-hide').attr('img-display', '0');
    }
    switch (position) {
        //right to left
        case 'right' :
            $('.details-img-2').removeClass('details-img-2').addClass('details-img-hide').data('position', '');
            $('.details-img-1').removeClass('details-img-1').addClass('details-img-2').data('position', 'left');
            $('.details-img-3').removeClass('details-img-3').addClass('details-img-1').data('position', 'center');
            $('.details-img-hide[img-display=0]').last().removeClass('details-img-hide').addClass('details-img-3').data('position', 'right').attr('img-display', '1');
            break;
        // left to right
        case 'left' :
            $('.details-img-3').removeClass('details-img-3').addClass('details-img-hide').data('position', '');
            $('.details-img-1').removeClass('details-img-1').addClass('details-img-3').data('position', 'right');
            $('.details-img-2').removeClass('details-img-2').addClass('details-img-1').data('position', 'center');
            $('.details-img-hide[img-display=0]').last().removeClass('details-img-hide').addClass('details-img-2').data('position', 'left').attr('img-display', '1');
            break;
    }
    var current = $('.details-img-1').data('detail');
    $('.news-details').addClass('d-none');
    $('.news-details[data-index='+current+']').removeClass('d-none');
}

function set_session_stroage(key, val) {
    sessionStorage.setItem(key, val);
}

function get_session_stroage(key) {
    var val = sessionStorage.getItem(key);
    return val;
}
