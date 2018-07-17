var facilities_top = document.querySelector('.facilities').offsetTop;
var vid = document.querySelector('.facilities video');

window.onscroll = () => {
    const nav = document.querySelector('nav');
    var class_name = '';
    if(this.scrollY <= 10) {
        class_name = '';
    } else {
        class_name = 'scroll-home';
    }

    if(this.scrollY >= facilities_top) {
        class_name = 'hide';
        vid.play();
    } else {
        vid.pause();
    }
    nav.className = class_name;
};
