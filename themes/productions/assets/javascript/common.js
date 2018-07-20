var facilities_top = document.querySelector('.facilities').offsetTop;
var quality_top = document.querySelector('.quality-content').offsetTop;
var vid = document.querySelector('.facilities video');

window.onscroll = function() {
    const nav = document.querySelector('nav');
    var class_name = '';
    var position;
    console.log('current ::::: ' + scrollY );
    console.log('facilities_top ::::: ' + facilities_top );
    console.log('quality_top ::::: ' + quality_top );
    if(this.scrollY <= 10) {
        class_name = '';
    } else if(this.scrollY >= quality_top){
        class_name = 'scroll-quality';
    } else {
        class_name = 'scroll-home';
    }

    if(this.scrollY > facilities_top && this.scrollY < quality_top) {
        class_name = 'hide';
        vid.play();
    } else {
        vid.pause();
    }

    nav.className = class_name;
};
