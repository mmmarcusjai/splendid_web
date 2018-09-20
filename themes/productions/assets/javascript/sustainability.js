var auto_animate;
var init_animate = false;
var animate_counter = 0;
var frame_display_arr = [1, 31, 51, 71];
var instance = $(".animate-area").spriteClip({
totalFrames: 101,
frameRate: 50,
}).data("spriteClip");

function next_sustainability_animate(frame) {
    instance.playtoAndStop(frame);
}

function prev_sustainability_animate(frame) {
    instance.rewindtoAndStop(frame);
}

function update_sustainability_target(target_frame) {
    var arr_index = frame_display_arr.indexOf(target_frame);
    var arr_length = frame_display_arr.length;
    switch (arr_index) {
        case 0 :
            // $('.sustainability .object-container .control#left').addClass('disable');
            // $('.sustainability .object-container .control#left').attr('to', '');
            $('.sustainability .object-container .control#left').attr('to', frame_display_arr[2]);
            $('.sustainability .object-container .control#right').attr('to', frame_display_arr[1]);
            break;
        case 1 :
            // $('.sustainability .object-container .control').removeClass('disable');
            $('.sustainability .object-container .control#left').attr('to', frame_display_arr[0]);
            $('.sustainability .object-container .control#right').attr('to', frame_display_arr[2]);
            break;
        case 2 :
            // $('.sustainability .object-container .control#right').addClass('disable');
            $('.sustainability .object-container .control#left').attr('to', frame_display_arr[1]);
            // $('.sustainability .object-container .control#right').attr('to', '');
            $('.sustainability .object-container .control#right').attr('to', frame_display_arr[3]);
            break;
        case 3 :
            // $('.sustainability .object-container .control#right').addClass('disable');
            $('.sustainability .object-container .control#left').attr('to', frame_display_arr[2]);
            // $('.sustainability .object-container .control#right').attr('to', '');
            $('.sustainability .object-container .control#right').attr('to', frame_display_arr[0]);
            break;
    }
}

function auto_play() {
    if(!init_animate) {
        auto_animate = setInterval(function() {
            sustainability_init();
            console.log('start init play');
        },4000);
        init_animate = true;
        console.log('already init');
    }
}

function off_auto_play() {
    clearInterval(auto_animate);
    instance.gotoAndStop(1);
    init_animate = false;
    animate_counter = 0;
    console.log('off!!!');
}

function sustainability_init() {
    if(animate_counter < frame_display_arr.length) {
        if(animate_counter != 0) {
            next_sustainability_animate(frame_display_arr[animate_counter]);
            update_sustainability_target(frame_display_arr[animate_counter]);
        }
        animate_counter++;
    } else {
        animate_counter = 0;
         next_sustainability_animate(frame_display_arr[animate_counter]);
         update_sustainability_target(frame_display_arr[animate_counter]);
    }
}

$(document).ready(function() {
    // auto_play();
    $('.control').on('click', function() {
        control = $(this).attr('id');
        to = parseInt($(this).attr('to'));
        if(!isNaN(to)) {
            switch (control) {
                case 'left':
                    prev_sustainability_animate(to);
                    break;
                case 'right':
                    next_sustainability_animate(to);
                    break;
            }
            update_sustainability_target(to);
            arr_index = frame_display_arr.indexOf(to);
            animate_counter = arr_index + 1;
            clearInterval(auto_animate);
            init_animate = false;
            auto_play();
        }
    });
});
