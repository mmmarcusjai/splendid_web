$(document).ready(function() {
    // Contact us
    $('.contact-us .control-btn img').on('click', function() {
        action = $(this).attr('action');
        contactus_slide(action);
    });
})

function contactus_slide(action) {
    if($('.slide-hide[img-display=1]').length == $('.slide-hide').length) {
    	$('.slide-hide').attr('img-display', '0');
    }

    switch(action) {
        case 'next' :
            $('.slide-bottom').removeClass('slide-bottom').addClass('slide-hide');
            $('.slide-main').removeClass('slide-main').addClass('slide-bottom');
            $('.slide-top').removeClass('slide-top').addClass('slide-main');
            $('.slide-hide[img-display=0]').last().removeClass('slide-hide').addClass('slide-top').attr('img-display', '1');
            break;
        case 'prev' :
            $('.slide-top').removeClass('slide-top').addClass('slide-hide');
            $('.slide-main').removeClass('slide-main').addClass('slide-top');
            $('.slide-bottom').removeClass('slide-bottom').addClass('slide-main');
            $('.slide-hide[img-display=0]').last().removeClass('slide-hide').addClass('slide-bottom').attr('img-display', '1');
        break;
    }
    $('.address-detail').addClass('d-none');

    $('.address-detail[id='+ $('.slide-main').data('display') +']').removeClass('d-none');
    // console.log('ID ::: ' + $('.slide-main').attr('id'));
}

function customClass(classname, currNode, action) {
    currNode.forEach(function(item){
        switch (action) {
            case 'add':
                item.classList.add(classname);
                break;
            case 'remove':
                item.classList.remove(classname);
                break
        }
    });
}

function addClassById(classname, id) {
    document.getElementById(id).classList.add(classname);
}

function removeClassById(classname, id) {
    document.getElementById(id).classList.remove(classname);
}

function toggleClassById(classname, id) {
    document.getElementById(id).classList.toggle(classname);
}

function replayGif(gifTarget) {
    var gif = document.querySelector('#' + gifTarget);
    var src = gif.getAttribute('src');
    // Update src attribute
    var rand = Math.floor(100000000 + Math.random() * 900000000);
    gif.setAttribute('src', src.trim() + '?' + rand);
}
