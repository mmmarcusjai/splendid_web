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
    resize_update();
}



document.querySelector('.explore-btn').addEventListener('click', () => {
    jump_to('about');
});

const newsPages = document.querySelectorAll('ul.pagination li');
newsPages.forEach(function(page){
    page.addEventListener('click', () => {
        type = page.parentElement.dataset.type;
        cat = 'solutions';
        pageNo = page.dataset.index;
        // get_page_news(type, cat, pageNo);
        renderNews.fetchData(type, cat, pageNo);
    });
});

var renderNews = new Vue({
   el: "#news-product",
   data: {
       newsList: []
   },
   methods: {
       fetchData: function(type, cat, pageNo) {
           var self = this;
           axios.get(base_url+'/api/getNewsByPage/'+type+'/'+cat+'/'+pageNo)
           .then(function (response) {
               if(response.data.data.length > 0) {
                   // render_news(response.data.data, type);
                    self.newsList = response.data.data;
                   console.log(response.data.data);
               }
           })
           .catch(function (error) {
               console.log(error);
           });
       }
    }
});
renderNews.fetchData('product', 'solutions', 1);

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

$(document).ready(function() {
    $('.menu-icon').click(function(){
		$(this).toggleClass('change');
        $('nav').toggleClass('active');
        $('.side-wrapper').toggleClass('active');
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

    // $.scrollify({
    //     section : ".scroll-section",
    //     // sectionName : "section-name",
    //     interstitialSection : "",
    //     easing: "easeOutExpo",
    //     scrollSpeed: 800,
    //     offset : 0,
    //     scrollbars: true,
    //     standardScrollElements: "",
    //     setHeights: false,
    //     overflowScroll: false,
    //     updateHash: false,
    //     touchScroll:false,
    //     before:function() {},
    //     after:function() {},
    //     afterResize:function() {},
    //     afterRender:function() {}
    // });
    resize_update();

    $('.description-slick').slick({
        infinite: false,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-arrow" id="left"></i>',
    });

    $('.sustain-slick').slick({
        infinite: false,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-arrow" id="left"></i>',
    });
});

function jump_to(id) {
    $('html, body').animate({
        // scrollTop: document.getElementById(id).offsetTop
        // scrollTop: sustainability_top
    });
    // var selected_id = 'm-' + id;
    // addClassById('selected', selected_id);
    if($('.side-wrapper').hasClass('active')) {
        $('.side-wrapper').removeClass('active');
        $('.menu-icon').removeClass('change');
        $('nav').removeClass('active');
    }
    window.location.href = '#' + id;
    // $('html, body').scrollTop(document.getElementById(id).offsetTop);
    // $.scrollify.instantMove("#" + id);

}

function resize_update() {
    var cw = document.body.clientWidth;
    if (cw < 768) {
        var news_desc = document.querySelectorAll('.news-desc-block');
        var news_desc_hover = document.querySelectorAll('.news-desc-block-hover');
        customClass('hide', news_desc, 'add');
        customClass('active', news_desc_hover, 'add');
    }
}

function get_page_news(type, cat, pageNo) {
    axios.get(base_url+'/api/getNewsByPage/'+type+'/'+cat+'/'+pageNo)
    .then(function (response) {
        if(response.data.data.length > 0) {
            render_news(response.data.data, type);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function render_news(newsData, type) {
    Vue.component('news-item', {
        props: ['news'],
        template: `
            <div class="news-item" news-type="product" :style="{ 'background-image': 'url(/splendid_dev/storage/app/media' + news.news_image_thumbnail + ')' }" :index="news.id">
                <div class="news-desc-block">
                    <p class="news-title text-uppercase">{{ news.title }}</p>
                    <p class="news-desc">{{ news.description }}</p>
                </div>
                <div class="news-desc-block-hover">
                    <p class="news-title text-uppercase">{{ news.title }}</p>
                    <p class="news-desc">{{ news.description }}</p>
                </div>
            </div>
            `
    })
    console.log(newsData);
    var app = new Vue({
        data: function() {
            return {
                newsList: newsData,
                newsType: type
            }
        },
        methods: {
            laodNews: function () {
                console.log('laodNews');
            }
        },
        el: '#news-' + type
    })
}
