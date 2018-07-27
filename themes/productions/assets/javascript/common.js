AOS.init();
var facilities_top = document.querySelector('.facilities').offsetTop;
var quality_top = document.querySelector('.quality-content').offsetTop;
var sustainability_top = document.querySelector('.sustainability').offsetTop;
var vid = document.querySelector('.facilities video');

var curr_popup_index = 0;
var total_home_popup = $('.home-pin').length;
var home_popup_arr = {
    1: 'pro',
    2: 'du',
    3: 'ct',
    4: 'io',
    5: 'ns',
}
window.onscroll = () => {
    const nav = document.querySelector('nav');
    var class_name = '';
    var position;

    if(this.scrollY <= 10) {
        class_name = '';
        vid.pause();
    } else if(this.scrollY >= facilities_top && this.scrollY < quality_top) {
        class_name = 'hide';
        vid.play();
    } else if(this.scrollY >= quality_top && this.scrollY < sustainability_top){
        class_name = 'scroll-quality';
        vid.pause();
    } else if(this.scrollY >= sustainability_top) {
        class_name = 'scroll-sustainability';
        vid.pause();
    } else {
        class_name = 'scroll-home';
        vid.pause();
    }
    // console.log('scrollY :::: ' + scrollY);
    // console.log('sustainability_top ::::: ' + sustainability_top);
    // console.log('class ::::: ' + class_name);
    nav.className = class_name;
};

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementById('object-container');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX <= touchstartX) {
        alert('Swiped left');
    }

    if (touchendX >= touchstartX) {
        alert('Swiped right');
    }

    if (touchendY <= touchstartY) {
        alert('Swiped up');
    }

    if (touchendY >= touchstartY) {
        alert('Swiped down');
    }

    if (touchendY === touchstartY) {
        alert('Tap');
    }
}

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
});

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
