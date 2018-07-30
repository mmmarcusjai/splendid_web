var frame_display_arr = [1, 27, 53];
var instance = $(".animate-area").spriteClip({
totalFrames: 78,
frameRate: 40,
// stops: [1, 15],
// frameWidth: 500,
}).data("spriteClip");

// instance.$el
// .on("mouseover", function () {
//     instance.play();
// })
// .on("mouseout", function () {
//     instance.rewind();
// });

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
            $('.sustainability .object-container .control#left').addClass('disable');
            $('.sustainability .object-container .control#left').attr('to', '');
            $('.sustainability .object-container .control#right').attr('to', frame_display_arr[1]);
            break;
        case 1 :
            $('.sustainability .object-container .control').removeClass('disable');
            $('.sustainability .object-container .control#left').attr('to', frame_display_arr[0]);
            $('.sustainability .object-container .control#right').attr('to', frame_display_arr[2]);
            break;
        case 2 :
            $('.sustainability .object-container .control#right').addClass('disable');
            $('.sustainability .object-container .control#left').attr('to', frame_display_arr[1]);
            $('.sustainability .object-container .control#right').attr('to', '');
            break;
    }
}

$(document).ready(function() {
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
        }
    });
});
