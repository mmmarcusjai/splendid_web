AOS.init();
var video = $('#my-video');
var ele_window = $(window);
// section offsetTop
var home_top = (document.querySelector('.home') != null) ? document.querySelector('.home').offsetTop : '';
var about_top = (document.querySelector('.about') != null) ? document.querySelector('.about').offsetTop : '';
var how_we_work_top = (document.querySelector('.how-we-work') != null) ? document.querySelector('.how-we-work').offsetTop : '';
var our_servise_top = (document.querySelector('.our-servise') != null) ? document.querySelector('.our-servise').offsetTop : '';
var sustainability_top = (document.querySelector('.sustainability') != null) ? document.querySelector('.sustainability').offsetTop : '';
var quality_top = (document.querySelector('.quality-and-safety') != null) ? document.querySelector('.quality-and-safety').offsetTop : '';
var news_top = (document.querySelector('.news') != null) ? document.querySelector('.news').offsetTop : '';
var contactus_top = (document.querySelector('.contact-us') != null) ? document.querySelector('.contact-us').offsetTop : '';
//
// Description block
var desc_block = document.querySelectorAll('.description-block');
//
window.onscroll = () => {
    // Navbar
    if(document.querySelector('.about') != null) {
        if(this.scrollY >= about_top) {
            $('#layout-header').addClass('active');
        } else {
            $('#layout-header').removeClass('active');
        }
    }

    // Update menu selected
    var menu_item = document.querySelectorAll('.menu-item');
    menu_item.forEach(function(item){
        item.classList.remove('selected');
    });

    if(this.scrollY >= home_top && this.scrollY < about_top) {

    } else if(this.scrollY >= about_top && this.scrollY < how_we_work_top) {
        // addClassById('selected', 'm-about');
        customClass('roll-in-blurred-left', desc_block, 'remove');
    } else if(this.scrollY >= how_we_work_top && this.scrollY < our_servise_top) {
        // addClassById('selected', 'm-how-we-work');
        customClass('roll-in-blurred-left', desc_block, 'add');
    } else if(this.scrollY >= our_servise_top && this.scrollY < quality_top) {
        // addClassById('selected', 'm-our-servise');
        customClass('roll-in-blurred-left', desc_block, 'remove');
    }else if(this.scrollY >= quality_top && this.scrollY < sustainability_top) {
        // addClassById('selected', 'm-quality-and-safety');
        // Off auto play sustainability cube
        off_auto_play();
    }  else if(this.scrollY >= sustainability_top && this.scrollY < news_top) {
        // addClassById('selected', 'm-sustainability');
        // Init auto play sustainability cube
        auto_play();
    } else if(this.scrollY >= news_top && this.scrollY < contactus_top) {
        // addClassById('selected', 'm-news');
        // Off auto play sustainability cube
        off_auto_play();
    } else if(this.scrollY >= contactus_top) {
        // addClassById('selected', 'm-contact-us');
    }

    if(this.scrollY >= our_servise_top && this.scrollY < parseInt(sustainability_top - 1000 )) {
        // Off auto play sustainability cube
       off_auto_play();
   }
};


window.onresize = () => {
    // var videoWidth = video.width();
    // var windowWidth = ele_window.width();
    // marginLeftAdjust =   (windowWidth - videoWidth) / 2;
    //
    // video.css({
    //     'left' : marginLeftAdjust
    // });
}

const newsObj = document.querySelectorAll('.news-item');

newsObj.forEach(function(news){
    news.addEventListener('mouseover', () => {
        news.children[0].classList.add('hide');
        news.children[1].classList.add('active');
        // Title slide from left
        news.children[1].children[0].classList.add('slide-in-left');
        // Description slide from left
        news.children[1].children[1].classList.add('slide-in-right');
    });
    news.addEventListener('mouseout', () => {
        news.children[0].classList.remove('hide');
        news.children[1].classList.remove('active');
        news.children[1].children[0].classList.remove('slide-in-left');
        news.children[1].children[1].classList.remove('slide-in-right');
    });
    news.addEventListener('click', () => {
        var news_id = news.getAttribute('index');
        window.location.href = base_url + "/solutions-news/" + news_id;
    });
});

document.querySelector('.explore-btn').addEventListener('click', () => {
    jump_to('about');
});

$(document).ready(function() {
    console.log(base_url);
    $('.menu-icon').click(function(){
		$(this).toggleClass('change');
        $('nav').toggleClass('active');
        if($(this).hasClass('change')) {
            $('.menu-text').text('');
        } else {
            $('.menu-text').text('menu');
        }
	});

    $('.description-block').on('mouseover', function() {
        $(this).addClass('active');
    })

    $('.description-block').on('mouseout', function() {
        $(this).removeClass('active');
    })

    const { NormalParallax } = MiniParallax;

    new NormalParallax('.js-parallax');

    $.scrollify({
        section : ".scroll-section",
        // sectionName : "section-name",
        interstitialSection : "",
        easing: "easeOutExpo",
        scrollSpeed: 1000,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: false,
        overflowScroll: false,
        updateHash: false,
        touchScroll:false,
        before:function() {},
        after:function() {},
        afterResize:function() {},
        afterRender:function() {}
    });
});

function jump_to(id) {
    $('html, body').animate({
        // scrollTop: document.getElementById(id).offsetTop
        // scrollTop: sustainability_top
    });
    // var selected_id = 'm-' + id;
    // addClassById('selected', selected_id);
    // window.location.href = '#' + id;
    // $('html, body').scrollTop(document.getElementById(id).offsetTop);
    $.scrollify.instantMove("#" + id);

}
