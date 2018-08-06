AOS.init();
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
    facilities_top = document.querySelector('.facilities').offsetTop;
    quality_top = document.querySelector('.quality-content').offsetTop;
    sustainability_top = document.querySelector('.sustainability').offsetTop;
    news_top = document.querySelector('.news').offsetTop;
    update_nav_class(this.scrollY);
}
window.onscroll = () => {
    update_nav_class(this.scrollY);
};


$('document').ready(function() {
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

    // setTimeout(function() {
        if(fromDetails && fromDetails != undefined) {
            $('html, body').animate({
                scrollTop: news_top + 9 + 'rem'
            });
        }
    // }, 3000);
});

function update_nav_class(scroll_y) {
    const nav = document.querySelector('nav');
    var class_name = '';

    if(scroll_y <= 10) {
        class_name = '';
        vid.pause();
    } else if(scroll_y >= facilities_top && scroll_y < quality_top) {
        class_name = 'hide';
        vid.play();
    } else if(scroll_y >= quality_top && scroll_y < sustainability_top){
        class_name = 'scroll-quality';
        vid.pause();
    } else if(scroll_y >= sustainability_top && scroll_y < news_top) {
        class_name = 'scroll-sustainability';
        vid.pause();
    } else if(scroll_y >= news_top && scroll_y < contactus_top) {
        class_name = 'scroll-news';
        vid.pause();
    } else if(scroll_y >= contactus_top ) {
        class_name = 'scroll-contactus';
        vid.pause();
    } else {
        class_name = 'scroll-home';
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
