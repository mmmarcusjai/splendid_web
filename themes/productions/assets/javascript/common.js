var facilities_top = document.querySelector('.facilities').offsetTop;
var quality_top = document.querySelector('.quality-content').offsetTop;
var vid = document.querySelector('.facilities video');

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

function show_home_popup(target) {
    // var popup = document.querySelector('.home-popup');
    // var popup_content = document.querySelector('.popup-content > .content[data-index='+target+']');
    $('.home-popup').addClass('show-popup');
    // popup_content.style.display = 'block';
}

function hide_popup() {
    $('.home-popup').removeClass('show-popup');
}
