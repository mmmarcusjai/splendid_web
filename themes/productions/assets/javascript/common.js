var facilities_top = document.querySelector('.facilities').offsetTop;
var quality_top = document.querySelector('.quality-content').offsetTop;
var vid = document.querySelector('.facilities video');

var curr_popup_index = 0;
var total_home_popup = $('.home-pin').length;

window.onscroll = () => {
    const nav = document.querySelector('nav');
    var class_name = '';
    var position;

    if(this.scrollY <= 10) {
        class_name = '';
        vid.pause();
    } else if(this.scrollY >= quality_top){
        class_name = 'scroll-quality';
        vid.pause();
    } else if(this.scrollY >= facilities_top) {
        class_name = 'hide';
        vid.play();
    } else {
        class_name = 'scroll-home';
        vid.pause();
    }

    nav.className = class_name;
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

    console.log('prev_index ::::: ' + prev_index);
    console.log('next_index ::::: ' + next_index);
    console.log('curr_popup_index ::::: ' + curr_popup_index);
}

function hide_popup() {
    $('html, body').css('overflow', 'visible');
    $('.home-popup').removeClass('show-popup');
}
